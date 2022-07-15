import numpy as np
from bamt.Preprocessors import Preprocessor
import pandas as pd
from sklearn import preprocessing as pp
import bamt.Networks as Networks


def BN_learning(directory, parameters):
    h = pd.read_csv(directory)
    if "hack_processed_with_rf" in directory:
        cols = ['Tectonic regime', 'Period', 'Lithology', 'Structural setting', 'Gross', 'Netpay', 'Porosity',
                'Permeability',
                'Depth']
        h = h[cols]

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
    else:
        bn.add_edges(data=discretized_data, optimizer='HC', scoring_function=(parameters["scoring_function"],))

    bn.fit_parameters(data=h)

    nodes = []
    for node in bn.nodes:
        nodes.append({"name": node.name, "type": node.type})

    sample = bn.sample(5, as_df=False)

    new = {i: [] for i in sample[0].keys()}
    for n in sample:
        for node, val in n.items():
            if isinstance(val, float):
                if val < 0:
                    # new[node].append(np.nan)
                    continue
                else:
                    new[node].append(val)
            else:
                new[node].append(val)

    for node, val in new.items():
        if isinstance(val[0], float):
            continue
        else:
            vals, counts = np.unique(val, return_counts=True)
            new[node] = {n: int(v) for n, v in zip(vals, counts)}

    return {"network": {"nodes": nodes, "edges": bn.edges},
            "sample": new}


def get_header_from_csv(file):
    return pd.read_csv(file, index_col=0, nrows=0).columns.tolist()
