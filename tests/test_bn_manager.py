def test_get_BN_data(client):
    response = client.get("api/bn_manager/get_BN/test")
    assert response.json["networks"] != {}


def test_get_sample(client):
    user_name, dataset_name, net_name, node = "test", "hack", "test", "Gross"

    response = client.get(f"api/bn_manager/get_display_data/{user_name}/{net_name}/{dataset_name}/{node}")

    assert response.status_code == 200, response.json
    assert response.json["xvals"] != []
    assert response.json["data"] != []
    assert response.json["metrics"] != {}

def test_delete(client):
    _ = client.delete("api/bn_manager/remove/test/test")

    bns = client.get("api/bn_manager/get_BN/test").json

    user_name, dataset_name, net_name, node = "test", "hack", "test", "Gross"

    assert not bns["networks"]
    response = client.get(f"api/bn_manager/get_display_data/{user_name}/{net_name}/{dataset_name}/{node}")

    assert response.status_code == 404


def test_get_equal_edges(client, bn_actions):
    _ = bn_actions.register_bn(params=dict(
        owner="test",
        name="a1",
        dataset="hack",
        bn_params={"has_logit": False,
                   "use_mixture": False,
                   "scoring_function": "K2"}))
    _ = bn_actions.register_bn(params=dict(
        owner="test",
        name="a2",
        dataset="hack",
        bn_params={"has_logit": False,
                   "use_mixture": False,
                   "scoring_function": "MI"}))

    response = client.get("api/bn_manager/get_equal_edges", query_string={"names": str(['a1', 'a2']), "owner": "test"})

    assert response.status_code == 200
    assert response.json["equal_edges"] == [['Structural setting', 'Period']]
