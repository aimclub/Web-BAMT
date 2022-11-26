def test_experiment(client, auth, bn_actions):
    # Covered by register_bn in bn_actions
    pass


def test_get_root_nodes(client, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn("a")

    nodes_hack = client.get("api/experiment/get_root_nodes/0").json["root_nodes"]
    nodes_vk = client.get("api/experiment/get_root_nodes/1").json["root_nodes"]

    assert nodes_hack != []
    assert nodes_vk != []