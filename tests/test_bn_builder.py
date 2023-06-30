import pandas as pd
import numpy as np

from app.api.experiment.service import BnBuilder


def test_params_validation():
    params_default = {"scoring_function": "K2", "use_mixture": False, "has_logit": True}

    false_init_nodes = {"init_nodes": ["node0", "not_a_node"]}
    false_init_edges = {"init_edges": [["node0", "node1"], ["not_a_node", "node3"]]}

    true_init_nodes = {"init_nodes": ["node0", "node1", "node2"]}
    true_init_edges = {"init_edges": [["node0", "node1"], ["node1", "node3"]]}

    nodes_names = [f"node{i}" for i in range(8)]

    assert BnBuilder(params_default | true_init_nodes | true_init_edges).params_validation(nodes_names)
    assert BnBuilder(params_default | false_init_nodes | false_init_edges).params_validation(nodes_names)[1] == 400


def test_make_obj():
    import app.api.experiment.str2callable as s2c

    builder = BnBuilder(parameters={})

    models = s2c.models

    # creating all objs
    assert [builder.make_obj(model_str) for model_str in models.keys()]


def test_choose_network():
    builder = BnBuilder(parameters={"use_mixture": True, "has_logit": True})

    cont_info = {f"node{i}": "cont" for i in range(8)}
    disc_info = {f"node{i}": np.random.choice(["disc", "disc_num"]) for i in range(8)}
    hyb_info = {f"node{i}": np.random.choice(["disc", "disc_num", "cont"]) for i in range(8)}

    assert [builder.choose_network(info).type for info in [cont_info, disc_info, hyb_info]] == \
           ["Continuous", "Discrete", "Hybrid"]


def test_build():
    # this also tests that compare_with_default works normal
    builder = BnBuilder(parameters={"scoring_function": "K2", "use_mixture": False, "has_logit": False,
                                    "compare_with_default": True})

    df = pd.read_csv("tests/test_types_data.csv", index_col=0)

    result = builder.build(df, user="test")

    assert result[0].edges
    assert result[1].edges

    # save bn for manager test
    # result[0].save(outdir="test_bn.json")


def test_learn():
    builder = BnBuilder(parameters={"scoring_function": ("K2", )})
    df = pd.read_csv("tests/test_types_data.csv", index_col=0)

    # repeated because bn_learning have split in tests mod
    bn = builder.learn(df, user="test", default=True, **builder.parameters)

    assert bn.edges