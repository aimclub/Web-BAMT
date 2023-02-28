from app import db


def test_get_BN_data(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="test")

    response1 = client.get("api/bn_manager/get_BN/test")
    assert response1.json["networks"] != {}

    response2 = client.get("api/bn_manager/get_BN/test")
    print(response2.json)
    assert response2.json["networks"] != []


def test_get_sample(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="test")
    response = client.get("api/bn_manager/get_sample/test/test/Gross").json

    assert response["sampled_data"]["xvals"] != []
    assert response["sampled_data"]["data"] != []
    assert response["real_data"]["xvals"] != []
    assert response["real_data"]["data"] != []


def test_delete(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="test")
    response = client.delete("api/bn_manager/remove/a/test")
    assert response.json["message"] == "Success"

    with app.app_context():
        assert db.session.execute(
            "SELECT * FROM nets WHERE owner = 'test'",
        ).fetchone() is None
        assert db.session.execute(
            "SELECT * FROM samples WHERE owner = 'test'",
        ).fetchone() is None