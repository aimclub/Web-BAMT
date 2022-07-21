import json

import numpy as np
from bamt.Preprocessors import Preprocessor
import pandas as pd
from sklearn import preprocessing as pp
import bamt.Networks as Networks

from .models import BayessianNet, Sample
from app import db


def BN_learning(directory, parameters):
    h = pd.read_csv(directory, index_col=0)

    encoder = pp.LabelEncoder()
    discretizer = pp.KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='uniform')

    p = Preprocessor([('encoder', encoder), ('discretizer', discretizer)])

    discretized_data, est = p.apply(h)
    info = p.info

    bn = Networks.HybridBN(has_logit=parameters["has_logit"], use_mixture=parameters["use_mixture"])

    bn.add_nodes(descriptor=info)
    if "params" in parameters.keys():
        if "init_nodes" in parameters["params"].keys():
            if any(i not in bn.nodes_names for i in parameters["params"]["init_nodes"]):
                return {"message": "Malformed init_nodes"}, 400
        if "init_edges" in parameters["params"].keys():
            if any(j not in bn.nodes_names for i in parameters["params"]["init_edges"] for j in i):
                return {"message": "Malformed init_edges"}, 400
        bn.add_edges(data=discretized_data, optimizer='HC', scoring_function=(parameters["scoring_function"],),
                     params=parameters["params"])

        # params unpacking
        for k, v in parameters['params'].items():
            if k != "remove_init_edges":
                val = str(v)
            else:
                val = v
            parameters[k] = str(val)
        del parameters["params"]
    else:
        bn.add_edges(data=discretized_data, optimizer='HC', scoring_function=(parameters["scoring_function"],))

    bn.fit_parameters(data=h)

    type_descriptor = {}
    for node in bn.nodes:
        type_descriptor[node.name] = node.type

    # ======= Sample preparations ============

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

    sample = bn.sample(442, as_df=False)

    new = {i: [] for i in sample[0].keys()}
    for n in sample:
        for node, val in n.items():
            if isinstance(val, float):
                if val < 0 or np.isnan(val):
                    # new[node].append(np.nan)
                    continue
                else:
                    new[node].append(val)
            else:
                new[node].append(val)

    if list(new.keys())[0] in ['Tectonic regime', 'Period', 'Lithology', 'Structural setting', 'Gross', 'Netpay',
                               'Porosity', 'Permeability', 'Depth']:
        loc = "data/0_sample.json"
    else:
        loc = "data/1_sample.json"

    with open(loc) as f:
        full_sample = json.load(f)

    new_to_plot = {}
    for node, val_list in new.items():
        if not val_list:
            continue
        elif isinstance(val_list[0], float):
            bins_raw = full_sample[node]["xvals"]
            bins = [list(map(lambda x: float(x), i.split(" - "))) for i in bins_raw]
            new_to_plot[node] = get_data_for_barplot(val_list, bins=bins)
        else:
            freq = pd.value_counts(val_list, normalize=True)
            new_to_plot[node] = {"data": freq.values.tolist(), "xvals": freq.index.tolist()}

    return {"network": parameters | {"edges": bn.edges, "nodes": bn.nodes_names, "descriptor": type_descriptor},
            "sample": new_to_plot}, 200


def update_db(network, sample):
    bn = BayessianNet(**network)
    sample = Sample(**sample)

    db.session.add(bn)
    db.session.add(sample)

    db.session.commit()


def get_header_from_csv(file):
    return pd.read_csv(file, index_col=0, nrows=0).columns.tolist()
