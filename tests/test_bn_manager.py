from app import db


def test_get_BN_data(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="a")

    response1 = client.get("api/bn_manager/get_BN/a")
    assert response1.json["networks"] != {}

    response2 = client.get("api/bn_manager/get_BN/a")
    assert response2.json["networks"] != []


def test_get_sample(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="a")
    response = client.get("api/bn_manager/get_sample/a/test/Gross").json

    assert response["sampled_data"]["xvals"] != []
    assert response["sampled_data"]["data"] != []
    assert response["real_data"]["xvals"] != []
    assert response["real_data"]["data"] != []


def test_delete(client, app, auth, bn_actions):
    auth.register_user(client)
    _ = bn_actions.register_bn(user="a")
    response = client.delete("api/bn_manager/remove/a/test")
    assert response.json["message"] == "Success"

    with app.app_context():
        assert db.session.execute(
            "SELECT * FROM nets WHERE owner = 'a'",
        ).fetchone() is None
        assert db.session.execute(
            "SELECT * FROM samples WHERE owner = 'a'",
        ).fetchone() is None