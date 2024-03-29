# The tests below were frozen due to the occurrence of non-pickle serialization.
# Most likely, because of version conflict, resolved on May 24.

# from app.api.experiment.service import Sampler, Manager
# from bamt_special.networks.hybrid_bn import HybridBN
#
# import pytest
#
#
# @pytest.fixture()
# def manager(client):
#     bn_meta = client.get("api/bn_manager/get_BN/test").json["networks"]["0"]
#
#     bn = HybridBN(has_logit=bn_meta["has_logit"], use_mixture=bn_meta["use_mixture"])
#     bn.load("test_bn.json")
#
#     sampler = Sampler()
#     sample = sampler.sample(10, bn)
#
#     return Manager(bn=bn, samples=sample, owner="test", net_name="test", dataset_name="test_dataset")

# def test_save_sample(app, client, manager):
#     with app.app_context():
#         manager.save_sample()
#
#         # file record test
#         assert isfile("Samples/test/test.csv")


# def test_db_update(app, client, manager):
#     params_default = {"scoring_function": "K2", "use_mixture": False, "has_logit": True}
#
#     network_to_db, sample_to_db = manager.packing(params_default)
#     with app.app_context():
#         manager.update_db(network_to_db, sample_to_db)
#
#         assert manager.is_sample()
#
#     os.remove("test_bn.json")
