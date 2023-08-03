from app import db


def test_register_and_token(client, app):
    response1 = client.post("api/auth/signup", json={"username": "a", "password": "a"})
    assert response1.status_code == 200

    with app.app_context():
        assert (
            db.session.execute(
                "SELECT * FROM users WHERE username = 'a'",
            ).fetchone()
            is not None
        )

    response2 = client.post(
        "api/auth/get_token", json={"username": "a", "password": "a"}
    )

    assert response2.status_code == 200
