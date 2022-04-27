from bamt.Preprocessors import Preprocessor
import pandas as pd
from sklearn import preprocessing as pp
import bamt.Networks as Networks


def BN_learning(directory, params):
    h = pd.read_csv(directory)

    cols = ['Tectonic regime', 'Period', 'Lithology', 'Structural setting', 'Gross', 'Netpay', 'Porosity',
            'Permeability',
            'Depth']
    h = h[cols]

    encoder = pp.LabelEncoder()
    discretizer = pp.KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='uniform')

    p = Preprocessor([('encoder', encoder), ('discretizer', discretizer)])

    discretized_data, est = p.apply(h)
    info = p.info

    bn = Networks.HybridBN(has_logit=params["has_logit"], use_mixture=params["use_mixture"])

    bn.add_nodes(descriptor=info)
    bn.add_edges(data=discretized_data, optimizer='HC', scoring_function=(params["scoring_function"],))

    bn.fit_parameters(data=h)

    nodes = []
    for node in bn.nodes:
        nodes.append({"name": node.name, "type": bn.type})

    return {"nodes": nodes,
            "edges": bn.edges}
