import pandas as pd
import numpy as np

from app.api.experiment.models import BayessianNet, Sample
from app import db

import os
import json

from ast import literal_eval
from flask import current_app
from utils import project_root

class SampleWorker(object):
    def __init__(self, owner, net_name, dataset_name, node):
        self.owner = owner
        self.net_name = net_name
        self.dataset_name = dataset_name
        self.node = node
        self.is_our = True if dataset_name in ["vk", "hack"] else False

    def extract_sample_meta(self):
        r_ = db.session.execute(
            f"""
            SELECT * FROM samples;
            """
        ).all()
        print(r_)
        if not self.is_our:
            r = db.session.execute(
                f"""
                SELECT * FROM samples
                WHERE owner='{self.owner}' and net_name='{self.net_name}' and dataset_name='{self.dataset_name}';
                """
            ).first()
        else:
            r = db.session.execute(
                f"""
                SELECT * FROM samples
                WHERE owner='dev' and dataset_name='{self.dataset_name}';
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
            if not self.is_our:
                sys_loc = current_app.config["SAMPLES_FOLDER"]
            else:
                sys_loc = project_root()
        path = os.path.join(sys_loc, rel_loc)

        if mode == "dataset":
            df = pd.read_csv(path, index_col=0)
        else:
            if self.is_our:
                df = pd.DataFrame(json.load(open(path)))
            else:
                df = pd.read_csv(path, index_col=0)

        if df.empty:
            raise FileNotFoundError
        return df
    @staticmethod
    def get_data_for_barplot(data, bins):
        numeric_values = []
        category_vals = []

        # bins = np.histogram_bin_edges(data)
        # end = len(bins)

        # for i1, i2 in zip(range(0, end), range(1, end)):
        #     n = 0
        #     for value in data:
        #         if bins[i1] <= value <= bins[i2]:
        #             n += 1
        #         else:
        #             continue
        #
        #     numeric_values.append(n / len(data))
        #     category_vals.append(f"{round(bins[i1], 2)} - {round(bins[i2], 2)}")
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
    def get_data_for_qq_plot(data1, data2):
        # Sort the data
        data1_sorted = np.sort(data1)
        data2_sorted = np.sort(data2)

        # Calculate quantiles
        quantiles = np.linspace(0, 1, 100)
        quantiles_data1 = np.quantile(data1_sorted, quantiles)
        quantiles_data2 = np.quantile(data2_sorted, quantiles)

        return quantiles_data1, quantiles_data2

    def get_display(self):
        sample_meta = self.extract_sample_meta()
        truth_meta = self.extract_truth_meta()

        series_from_sample = self.extract_file(sample_meta.sample_loc, mode="sample")[self.node]
        if literal_eval(truth_meta.map)[self.node] == "float":
            series_from_dataset = self.extract_file(truth_meta.location, mode="dataset")[self.node]
            q1, q2 = self.get_data_for_qq_plot(series_from_dataset, series_from_dataset)
            return {"data": list(q1), "xvals": list(q1), "type": "cont"}
        else:
            freq = pd.value_counts(series_from_sample, normalize=True)
            return {"data": freq.values.tolist(), "xvals": freq.index.tolist(), "type": "disc"}

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
    Sample.query.filter_by(owner=owner, net_name=name).delete()
    db.session.commit()


def remove_bn(owner, name):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
