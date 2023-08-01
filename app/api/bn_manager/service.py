import os
from ast import literal_eval
from typing import Union, List, Optional

import numpy as np
import pandas as pd
from flask import current_app
from bamt_special.external.pyitlib.DiscreteRandomVariableUtils import divergence_jensenshannon
from scipy import stats
from sklearn import preprocessing
from sklearn.metrics import mean_squared_error
from sqlalchemy.engine.result import Result
from statsmodels.graphics.gofplots import ProbPlot

from app import db
from app.api.experiment.models import BayessianNet, Sample
from utils import project_root


class SampleWorker(object):
    """This class was intended to provide a samples with specific conditions."""

    def __init__(self, owner, net_name, dataset_name, node):
        self.owner = owner
        self.net_name = net_name
        self.dataset_name = dataset_name
        self.node = node
        self.is_our = True if dataset_name in ["vk", "hack"] else False

    def get_default(self) -> Union[Result, bool]:
        # method returns default dataset if it exists
        r = db.session.execute(
            f"""
            SELECT * FROM samples
            WHERE owner='{self.owner}' and dataset_name='{self.dataset_name}' and is_default=1 ;
            """
        ).first()
        if r:
            return r
        else:
            return False

    def extract_sample_meta(self) -> Result:
        r = db.session.execute(
            f"""
            SELECT * FROM samples
            WHERE
            owner='{self.owner}' and
             net_name='{self.net_name}' and
              dataset_name='{self.dataset_name}' and
               is_default=0;
            """
        ).first()

        if not r:
            raise FileNotFoundError
        return r

    def extract_truth_meta(self) -> Result:
        if not self.is_our:
            meta = db.session.execute(
                f"""
                SELECT * FROM datasets
                WHERE owner='{self.owner}' and name='{self.dataset_name}';
                """
            ).first()
        else:
            meta = db.session.execute(
                f"""
                SELECT * FROM datasets
                WHERE owner='dev' and name='{self.dataset_name}';
                """
            ).first()
        if not meta:
            raise FileNotFoundError
        return meta

    def extract_file(self, rel_loc: str, mode: str) -> pd.DataFrame:
        if mode == "dataset":
            if not self.is_our:
                sys_loc = current_app.config["DATASETS_FOLDER"]
            else:
                sys_loc = project_root()
        else:
            sys_loc = current_app.config["SAMPLES_FOLDER"]
        path = os.path.join(sys_loc, rel_loc)

        df = pd.read_csv(path, index_col=0)

        if df.empty:
            raise FileNotFoundError
        return df

    @staticmethod
    def get_data_for_qq_plot_cont(data1, data2):
        # Sort the data
        data1_sorted = np.sort(data1)
        data2_sorted = np.sort(data2)

        # Calculate quantiles
        quantiles = np.linspace(0, 1, 10)
        quantiles_data1 = np.quantile(data1_sorted, quantiles)
        quantiles_data2 = np.quantile(data2_sorted, quantiles)

        return quantiles_data1, quantiles_data2

    @staticmethod
    def get_data_for_qq_plot_disc(series_from_sample, series_from_dataset):
        freq_sample = pd.value_counts(series_from_sample, normalize=True)
        freq_df = pd.value_counts(series_from_dataset, normalize=True)

        freq_df = freq_df[freq_df.index.isin(freq_sample.index)]

        x_sample = stats.multinomial.rvs(n=100, p=freq_sample, random_state=42)
        x_theor = stats.multinomial.rvs(n=100, p=freq_df, random_state=42)

        return ProbPlot(x_sample).sample_quantiles, ProbPlot(x_theor).sample_quantiles

    @staticmethod
    def kl_divergence_(p, q) -> float:
        return np.sum(np.where((p != 0) & (q != 0), p * np.log(p / q), 0))

    @staticmethod
    def rmse_(p, q) -> float:
        return mean_squared_error(
            [[i, j] for i, j in zip(p, q)], [[i, i] for i in p], squared=False
        )

    @staticmethod
    def convert_to_intc(*args, series: bool = False) -> List:
        if series:
            return [i.values.astype(np.intc) for i in args]
        else:
            return [i[:, 0].astype(np.intc) for i in args]

    def jensenshannon_div(
        self,
        discretizer: callable,
        series_from_dataset: pd.Series,
        series_from_sample: pd.Series,
        series_sample_default: Optional[Union[pd.Series, np.ndarray]],
    ) -> tuple[np.ndarray, Optional[np.ndarray]]:
        default_div = None

        if discretizer:
            dataset_discretized = discretizer.fit_transform(
                series_from_dataset.values.reshape(-1, 1)
            )
            sample_discretized = discretizer.transform(
                series_from_sample.values.reshape(-1, 1)
            )

            series_from_dataset, series_from_sample = self.convert_to_intc(
                dataset_discretized, sample_discretized
            )

        if all([i.dtype == "bool" for i in [series_from_dataset, series_from_sample]]):
            series_from_dataset, series_from_sample = self.convert_to_intc(
                series_from_dataset, series_from_sample, series=True
            )

        # FIX FOR PYITLIB
        try:
            div = divergence_jensenshannon(series_from_dataset, series_from_sample)
        except AssertionError:
            if isinstance(series_from_dataset, pd.Series):
                content = [series_from_dataset.dtypes, series_from_sample.dtypes]
            elif isinstance(series_from_dataset, np.ndarray):
                content = [series_from_dataset.dtype, series_from_sample.dtype]
            else:
                content = "Unknown data type for dataset's series."
            raise TypeError(
                f"Data type error (input: {series_from_dataset.__class__}): {content}"
            )

        if isinstance(series_sample_default, (np.ndarray, pd.Series)):
            if discretizer:
                sample_default_discretized = discretizer.transform(
                    series_sample_default.values.reshape(-1, 1)
                )
                series_sample_default = self.convert_to_intc(
                    sample_default_discretized
                )[0]

            if series_sample_default.dtype == "bool":
                series_sample_default = self.convert_to_intc(
                    series_sample_default, series=True
                )[0]

            default_div = divergence_jensenshannon(
                series_from_dataset, series_sample_default
            )
        return div, default_div

    def kl_divergence(
        self,
        quantile_gen: callable,
        series_from_dataset,
        series_from_sample,
        sample_series_default,
    ):
        default_kl_div = None

        q1, q2 = quantile_gen(series_from_sample, series_from_dataset)
        kl_div = self.kl_divergence_(q1, q2)

        if isinstance(sample_series_default, pd.Series):
            q1_d, q2_d = quantile_gen(sample_series_default, series_from_dataset)
            default_kl_div = self.kl_divergence_(q1_d, q2_d)
        return kl_div, default_kl_div

    def rmse(
        self,
        quantile_gen: callable,
        series_from_dataset,
        series_from_sample,
        sample_series_default,
    ):
        default_rmse = None

        q1, q2 = quantile_gen(series_from_sample, series_from_dataset)
        rmse_val = self.rmse_(q1, q2)

        if isinstance(sample_series_default, pd.Series):
            q1_d, q2_d = quantile_gen(sample_series_default, series_from_dataset)
            default_rmse = self.rmse_(q1_d, q2_d)
        return rmse_val, default_rmse

    def get_display(self):
        sample_meta = self.extract_sample_meta()
        truth_meta = self.extract_truth_meta()

        series_from_sample = self.extract_file(sample_meta.sample_loc, mode="sample")

        if not self.node in series_from_sample:
            return {"error": f"Request error: {self.node}."}
        else:
            series_from_sample = series_from_sample[self.node]

        if self.get_default():
            sample_series_default = self.extract_file(
                self.get_default().sample_loc, mode="sample"
            )[self.node]
        else:
            sample_series_default = None

        series_from_dataset = self.extract_file(truth_meta.location, mode="dataset")[
            self.node
        ]

        if literal_eval(truth_meta.map)[self.node] == "float":
            quantile_generator = self.get_data_for_qq_plot_cont
            discretizer = preprocessing.KBinsDiscretizer(
                n_bins=20, encode="ordinal", strategy="quantile"
            )
            std = series_from_dataset.std()
        else:
            quantile_generator = self.get_data_for_qq_plot_disc
            discretizer = None
            std = None

        jen_shan_div, jen_shan_div_default = self.jensenshannon_div(
            discretizer, series_from_dataset, series_from_sample, sample_series_default
        )

        q1, q2 = quantile_generator(series_from_sample, series_from_dataset)

        return {
            "data": [int(i) for i in q1],
            "xvals": [int(i) for i in q2],
            "metrics": {
                "jen_shan_div": round(jen_shan_div.item(), 3),
                "jen_shan_div_default": round(jen_shan_div_default.item(), 3)
                if jen_shan_div_default
                else None,
                "std": round(std, 3) if std else None,
            },
        }


def find_bns_by_user(owner: str):
    nets = BayessianNet.query.filter_by(owner=owner).all()
    return nets


def find_bns_by_owner_and_name(owner: str, name: str):
    return BayessianNet.query.filter_by(owner=owner, name=name).all()


def find_bn_names_by_user(owner: str):
    return BayessianNet.query.filter_by(owner=owner).with_entities(BayessianNet.name)


def find_sample(owner: str, net_name: str):
    return (
        Sample.query.filter_by(owner=owner, net_name=net_name)
        .with_entities(Sample.sample_loc)
        .first()
    )


def find_edges_by_owner_and_nets_names(names: list, owner: str):
    names_str = str(names).replace("[", "(").replace("]", ")")
    query = f"""SELECT nets.edges FROM nets WHERE nets.owner='{owner}' and nets.name in {names_str};"""
    edges = db.session.execute(query).fetchall()
    return edges


def remove_samples(owner: str, name: str):
    query_res = Sample.query.filter_by(owner=owner, net_name=name, is_default=0)
    rel_path = query_res.first().sample_loc
    abs_path = os.path.join(current_app.config["SAMPLES_FOLDER"], rel_path)

    os.remove(abs_path)
    query_res.delete()
    db.session.commit()


def remove_bn(owner: str, name: str):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
