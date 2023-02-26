def test_experiment(client, auth, bn_actions):
    # Register_bn on our data is covered by bn_actions. Here we cover register_bn on their data.
    auth.register_user(client)

    dataset = "test_their"
    bn_params = {"has_logit": False,
                  "use_mixture": False,
                  "scoring_function": "K2"}

    responce = client.get(
        f"api/experiment/test/testBN/{dataset}/{bn_params}")
    # print(responce.json)

    bn_params = {"has_logit": False,
                 "use_mixture": False,
                 "scoring_function": "K2",
                 "params": {"remove_init_edges": True}}

    responce = client.get(
        f"api/experiment/test/testBN/{dataset}/{bn_params}")


def test_get_root_nodes(client, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn("test")

    nodes_hack = client.get("api/experiment/get_root_nodes/0").json["root_nodes"]
    nodes_vk = client.get("api/experiment/get_root_nodes/1").json["root_nodes"]

    assert nodes_hack != []
    assert nodes_vk != []