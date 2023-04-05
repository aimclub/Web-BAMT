import pandas as pd
import numpy as np

from app.api.experiment.models import BayessianNet, Sample
from app import db

import os

from sklearn.mixture import GaussianMixture

from ast import literal_eval
from flask import current_app
from utils import project_root
from scipy import stats
from statsmodels.graphics.gofplots import ProbPlot


class SampleWorker(object):
    def __init__(self, owner, net_name, dataset_name, node):
        self.owner = owner
        self.net_name = net_name
        self.dataset_name = dataset_name
        self.node = node
        self.is_our = True if dataset_name in ["vk", "hack"] else False

    def extract_sample_meta(self):
        r = db.session.execute(
            f"""
            SELECT * FROM samples
            WHERE owner='{self.owner}' and net_name='{self.net_name}' and dataset_name='{self.dataset_name}';
            """
        ).first()

        if not r:
            raise FileNotFoundError
        return r

    def extract_truth_meta(self):
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
    def get_data_for_barplot(data, bins):
        numeric_values = []
        category_vals = []

        for bin_min, bin_max in bins:
            n = 0
            for value in data:
                if bin_min <= value <= bin_max:
                    n += 1
                else:
                    continue

            numeric_values.append(n / len(data))
            category_vals.append(f"{round(bin_min, 2)} - {round(bin_max, 2)}")
        return {"data": numeric_values, "xvals": category_vals}

    @staticmethod
    def get_data_for_qq_plot_cont(data1, data2):
        # Sort the data
        data1_sorted = np.sort(data1)
        data2_sorted = np.sort(data2)

        # Calculate quantiles
        quantiles = np.linspace(0, 1, 100)
        quantiles_data1 = np.quantile(data1_sorted, quantiles)
        quantiles_data2 = np.quantile(data2_sorted, quantiles)

        return quantiles_data1, quantiles_data2

    @staticmethod
    def get_data_for_qq_plot_disc(probas1, probas2):
        x_sample = stats.multinomial.rvs(n=100, p=probas1, random_state=42)
        x_theor = stats.multinomial.rvs(n=100, p=probas2, random_state=42)

        return ProbPlot(x_sample).sample_quantiles, ProbPlot(x_theor).sample_quantiles

    @staticmethod
    def kl_divergence(p, q):
        return np.sum(np.where(p != 0, p * np.log(p / q), 0))

    def make_probas_cont(self, df_series, sample):
        total = df_series.shape[0]
        train, test = df_series[0:int(.8 * total)].values, df_series[int(.2 * total):].values

        gaussian_mixture = GaussianMixture(n_components=3, random_state=42)
        gaussian_mixture.fit(train.reshape(-1, 1))

        df_proba = gaussian_mixture.predict_proba(test.reshape(-1, 1))

        gaussian_mixture.fit(sample.values.reshape(-1, 1))
        sample_proba = gaussian_mixture.predict_proba(test.reshape(-1, 1))

        return df_proba, sample_proba

    def get_display(self):
        sample_meta = self.extract_sample_meta()
        truth_meta = self.extract_truth_meta()

        series_from_sample = self.extract_file(sample_meta.sample_loc, mode="sample")

        if not self.node in series_from_sample:
            return {"error": f"Request error: {self.node}."}
        else:
            series_from_sample = series_from_sample[self.node]

        series_from_dataset = self.extract_file(truth_meta.location, mode="dataset")[self.node]
        if literal_eval(truth_meta.map)[self.node] == "float":
            q1, q2 = self.get_data_for_qq_plot_cont(series_from_dataset, series_from_sample)
            kl_div = self.kl_divergence(*self.make_probas_cont(series_from_dataset, series_from_sample))
        else:
            freq_sample = pd.value_counts(series_from_sample, normalize=True)
            freq_df = pd.value_counts(series_from_dataset, normalize=True)

            not_predicted = set(freq_df.index.tolist()) - set(freq_sample.index.tolist())

            for column in not_predicted:
                freq_sample[column] = 0.0

            q1, q2 = self.get_data_for_qq_plot_disc(freq_sample.tolist(), freq_df.tolist())

            kl_div = self.kl_divergence(freq_sample.values, freq_df.values)
        return {"data": [int(i) for i in q1],
                "xvals": [int(i) for i in q2],
                "metrics": {"kl_divergence": kl_div}}


def find_bns_by_user(owner):
    nets = BayessianNet.query.filter_by(owner=owner).all()
    return nets


def find_bns_by_owner_and_name(owner, name):
    return BayessianNet.query.filter_by(owner=owner, name=name).all()


def find_bn_names_by_user(owner):
    return BayessianNet.query.filter_by(owner=owner).with_entities(BayessianNet.name)


def find_sample(owner, net_name):
    return Sample.query.filter_by(owner=owner, net_name=net_name).with_entities(Sample.sample_loc).first()


def find_edges_by_owner_and_nets_names(names: list, owner: str):
    names_str = str(names).replace("[", "(").replace("]", ")")
    query = f"""SELECT nets.edges FROM nets WHERE nets.owner='{owner}' and nets.name in {names_str}"""
    edges = db.session.execute(query).fetchall()
    return edges


def remove_samples(owner, name):
    query_res = Sample.query.filter_by(owner=owner, net_name=name)
    rel_path = query_res.first().sample_loc
    abs_path = os.path.join(current_app.config["SAMPLES_FOLDER"], rel_path)

    os.remove(abs_path)
    query_res.delete()
    db.session.commit()


def remove_bn(owner, name):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
