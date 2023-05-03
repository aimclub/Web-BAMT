import json
import os
import pandas as pd

from bamt.networks.hybrid_bn import HybridBN
from bamt.networks.discrete_bn import DiscreteBN
from bamt.networks.continuous_bn import ContinuousBN

from bamt.preprocessors import Preprocessor
from bamt.utils.GraphUtils import nodes_types

from sklearn import preprocessing as pp

from .models import BayessianNet, Sample

from app import db
from flask import current_app
from utils import project_root


class DataExtractor(object):
    def __init__(self, dataset: str):
        """
        :param dataset: str, name of dataset
        """
        # self.hyperparams = hyperparams
        self.dataset = dataset
        self.is_our = True if dataset in ["vk", "hack"] else False

    def extract_meta(self, user: str):
        """
        Extracting a dataset meta form database
        :param user:
        :return:
        """
        if not self.is_our:
            query = \
            f"""
            SELECT location, map from datasets 
            WHERE owner='{user}' and name='{self.dataset}';
            """
        else:
            query = \
            f"""
            SELECT location, map from datasets 
            WHERE owner='dev' and name='{self.dataset}';
            """

        dataset = db.session.execute(query).first()
        if not dataset:
            return False
        return dataset

    def extract_file(self, meta):
        """
        meta: Dict["location": str, "map": Dict]
        Extracting a dataset form database and convert datatypes according a map
        """

        hyperparams = {"index_col": 0}
        if self.is_our:
            loc = os.path.join(project_root(), os.path.relpath(meta["location"]))
        else:
            loc = os.path.join(current_app.config["DATASETS_FOLDER"], os.path.relpath(meta["location"]))
        dataset = pd.read_csv(loc, **hyperparams)

        if dataset.empty:
            raise FileNotFoundError

        if not meta["map"] == "null":
            return dataset.astype(json.loads(meta["map"]))
        else:
            return dataset

    def __repr__(self):
        return f"Extractor on '{self.dataset}'"


class BnBuilder(object):
    def __init__(self, parameters):
        self.parameters = parameters

    def params_validation(self, nodes_names):
        if "params" in self.parameters.keys():
            if "init_nodes" in self.parameters["params"].keys():
                if any(i not in nodes_names for i in self.parameters["params"]["init_nodes"]):
                    return {"message": "Malformed init_nodes"}, 400
            if "init_edges" in self.parameters["params"].keys():
                if any(j not in nodes_names for i in self.parameters["params"]["init_edges"] for j in i):
                    return {"message": "Malformed init_edges"}, 400
            return True
        else:
            return {"message": "Parameters were not found"}, 400

    def unpack_params(self, params):
        """
        params unpacking for saving into db
        {<...> , {"params" : <...>}} -> {<...>}
        """
        for k, v in params['params'].items():
            if k != "remove_init_edges":
                val = str(v)
            else:
                val = v
            params[k] = val

        _ = params.pop("params")
        self.parameters = params

    def preprocessing(self, data):
        encoder = pp.LabelEncoder()
        discretizer = pp.KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='quantile')

        p = Preprocessor([('encoder', encoder), ('discretizer', discretizer)])

        discretized_data, est = p.apply(data)
        info = p.info
        return discretized_data, info


    def choose_network(self, info: dict):
        if all("cont" == i for i in info.values()):
            return ContinuousBN(use_mixture=self.parameters["use_mixture"])
        elif all(i in ["disc", "disc_num"] for i in info.values()):
            return DiscreteBN()
        else:
            return HybridBN(use_mixture=self.parameters["use_mixture"],
                                     has_logit=self.parameters["has_logit"])

    @staticmethod
    def make_obj(model_str):
        if not model_str:
            return None
        from .str2callable import models
        return models[model_str]()

    def build(self, df, user: str):
        bn = self.choose_network(nodes_types(df))

        discretized_data, info = self.preprocessing(df)
        bn.add_nodes(info)

        bn.add_edges(data=discretized_data, optimizer='HC',
                     scoring_function=(self.parameters["scoring_function"],),
                     classifier=self.make_obj(self.parameters.get("classifier", None)),
                     regressor=self.make_obj(self.parameters.get("regressor", None)),
                     params=self.parameters.get("params", None),
                     progress_bar=False)

        if self.parameters.get("params", False):
            self.unpack_params(self.parameters)
        bn.fit_parameters(df, user=user)
        return bn, df.shape[0]


class Sampler(object):
    def __init__(self, bn):
        self.bn = bn

    def sample(self, df_shape):
        sample = self.bn.sample(df_shape*5, progress_bar=False)

        pos_cols = []
        for node, sign in self.bn.descriptor["signs"].items():
            if sign == "pos":
                pos_cols.append(node)

        sample_filtered = sample[(sample[pos_cols] > 0).all(axis=1)]
        return sample_filtered


class Manager(object):
    """
    This class supposed to convert input to the database format and send it there.
    """

    def __init__(self,
                 bn, sample,
                 owner, net_name, dataset_name):
        self.bn = bn
        self.sample = sample
        self.owner = owner
        self.net_name = net_name
        self.dataset_name = dataset_name
    def save_sample(self):
        self.sample.to_csv(os.path.join(current_app.config["SAMPLES_FOLDER"],
                                        self.owner,
                                        self.net_name + ".csv"))

    def is_sample(self):
        r = db.session.execute(
            f"""
            SELECT * FROM samples
            WHERE owner='{self.owner}' and net_name='{self.net_name}' and dataset_name='{self.dataset_name}' and
            dataset_name not in (1, 2);
            """
        ).first()
        if r:
            return True
        else:
            return False

    def packing(self, parameters):
        type_descriptor = {}
        for node in self.bn.nodes:
            type_descriptor[node.name] = node.type

        network = parameters | {"edges": str(self.bn.edges), "nodes": str(self.bn.nodes_names),
                                "descriptor": str(type_descriptor)}
        network_to_db = network | {"owner": self.owner, "name": self.net_name, "dataset_name": self.dataset_name}

        sample_loc = os.path.join(self.owner,
                                  self.net_name + ".csv")
        sample_to_db = {"sample_loc": sample_loc, "owner": self.owner, "net_name": self.net_name,
                        "dataset_name":self.dataset_name}
        return network_to_db, sample_to_db

    def update_db(self, network, sample):
        bn = BayessianNet(**network)

        if not self.is_sample():
            sample = Sample(**sample)
            db.session.add(sample)

        db.session.add(bn)
        db.session.commit()


def bn_learning(dataset, parameters, user):
    extractor = DataExtractor(dataset=dataset)

    dataset_meta = extractor.extract_meta(user=user)
    if not dataset_meta:
        return {"message": "Dataset meta not found."}, 404

    df = extractor.extract_file(dataset_meta)
    if df.empty:
        return {"message": "Dataset file not found"}, 404

    builder = BnBuilder(parameters=parameters)
    check = builder.params_validation(df.columns)
    if check:
        bn, df_shape = builder.build(df, user)
    else:
        return check, 500

    return bn, df_shape, 200
