def test_get_example(client, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="a")

    response1 = client.get("api/example/get_example/0")
    assert response1 is not None
