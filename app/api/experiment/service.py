import json
import os

import pandas as pd
from bamt_special.networks.continuous_bn import ContinuousBN
from bamt_special.networks.discrete_bn import DiscreteBN
from bamt_special.networks.hybrid_bn import HybridBN
from bamt_special.preprocessors import Preprocessor
from bamt_special.utils.GraphUtils import nodes_types
from flask import current_app
from sklearn import preprocessing as pp

from app import db
from utils import project_root
from .models import BayessianNet, Sample
from app.api.bn_manager.service import SampleWorker


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
            if not k in ["remove_init_edges", "compare_with_default"]:
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

    def choose_network(self, info: dict, default: bool = False):
        if all("cont" == i for i in info.values()):
            if default:
                return ContinuousBN()
            else:
                return ContinuousBN(use_mixture=self.parameters["use_mixture"])
        elif all(i in ["disc", "disc_num"] for i in info.values()):
            return DiscreteBN()
        else:
            if default:
                return HybridBN()
            else:
                return HybridBN(use_mixture=self.parameters["use_mixture"],
                                has_logit=self.parameters["has_logit"])

    @staticmethod
    def make_obj(model_str):
        if not model_str:
            return None
        from .str2callable import models
        return models[model_str]()

    def learn(self, df, user, default=False, **kwargs):
        bn = self.choose_network(nodes_types(df), default=default)

        discretized_data, info = self.preprocessing(df)
        bn.add_nodes(info)

        bn.add_edges(discretized_data, optimizer='HC', progress_bar=False, **kwargs)

        if self.parameters.get("params", False):
            self.unpack_params(self.parameters)
        bn.fit_parameters(df, user=user)
        return bn

    def build(self, df, user: str):
        bn_default = None

        # separate parameters for learning out of bn's parameters
        bn_params = dict(scoring_function=(self.parameters["scoring_function"],),
                         classifier=self.make_obj(self.parameters.get("classifier", None)),
                         regressor=self.make_obj(self.parameters.get("regressor", None)),
                         params=self.parameters.get("params", None))

        bn = self.learn(df, user, **bn_params)

        if self.parameters.get("compare_with_default", False):
            bn_params["classifier"] = None
            bn_params["regressor"] = None
            bn_default = self.learn(df, user, default=True, **bn_params)

        return bn, bn_default


class Sampler(object):
    @staticmethod
    def sample(df_shape, *bns):
        samples = []
        for bn in bns:
            if not bn:
                samples.append(None)
                continue
            sample = bn.sample(df_shape * 5, progress_bar=False)

            pos_cols = []
            for node, sign in bn.descriptor["signs"].items():
                if sign == "pos":
                    pos_cols.append(node)

            sample_filtered = sample[(sample[pos_cols] > 0).all(axis=1)]
            samples.append(sample_filtered)
        return samples


class Manager(object):
    """
    This class supposed to convert input to the database format and send it there.
    """

    def __init__(self,
                 bn, samples,
                 owner, net_name, dataset_name):
        self.bn = bn
        self.samples = samples
        self.owner = owner
        self.net_name = net_name
        self.dataset_name = dataset_name

    def save_samples(self):
        self.samples[0].to_csv(os.path.join(current_app.config["SAMPLES_FOLDER"],
                                            self.owner,
                                            self.net_name + ".csv"))
        if isinstance(self.samples[1], (pd.DataFrame, pd.Series)):
            self.samples[1].to_csv(os.path.join(current_app.config["SAMPLES_FOLDER"],
                                                self.owner,
                                                self.net_name + "_default.csv"))

    def is_sample(self):
        r = db.session.execute(
            f"""
            SELECT * FROM samples
            WHERE owner='{self.owner}' and net_name='{self.net_name}' and dataset_name='{self.dataset_name}';
            """
        ).first()
        if r:
            return True
        else:
            return False

    def is_default(self):
        r = db.session.execute(
            f"""
            SELECT is_default FROM samples
            WHERE owner='{self.owner}' and dataset_name='{self.dataset_name}';
            """
        ).first()

        if r:
            return True
        else:
            return False

    def packing(self, parameters):
        type_descriptor = {}
        sample_loc = os.path.join(self.owner,
                                  self.net_name + ".csv")
        default_sample_to_db = None

        is_default = parameters.get("compare_with_default", False)

        if is_default:
            default_sample_loc = os.path.join(self.owner,
                                              self.net_name + "_default.csv")
            default_sample_to_db = {"sample_loc": default_sample_loc, "owner": self.owner, "net_name": self.net_name,
                                    "dataset_name": self.dataset_name,
                                    "is_default": parameters.pop("compare_with_default")}

        for node in self.bn.nodes:
            type_descriptor[node.name] = node.type

        network = parameters | {"edges": str(self.bn.edges), "nodes": str(self.bn.nodes_names),
                                "descriptor": str(type_descriptor)}
        network_to_db = network | {"owner": self.owner, "name": self.net_name, "dataset_name": self.dataset_name}

        sample_to_db = {"sample_loc": sample_loc, "owner": self.owner, "net_name": self.net_name,
                        "dataset_name": self.dataset_name}

        return network_to_db, sample_to_db, default_sample_to_db

    def update_db(self, network, sample, default_sample):
        bn = BayessianNet(**network)

        if not self.is_sample():
            sample = Sample(**sample)
            db.session.add(sample)

        if not self.is_default() and default_sample:
            sample_d = Sample(**default_sample)
            db.session.add(sample_d)

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
        bn, bn_default = builder.build(df, user)
    else:
        return check, 500

    return bn, bn_default, df.shape[0], 200


def is_default_cached(owner, net_name, dataset_name):
    worker = SampleWorker(owner=owner, net_name=net_name, dataset_name=dataset_name, node=None)
    if worker.get_default():
        return True
    else:
        return False