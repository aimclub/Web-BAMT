import pytest
from app import db


def test_register_and_token(client, app):
    response1 = client.post(
        'api/auth/signup', json={'email': 'a', 'password': 'a'}
    )
    assert response1.status_code == 200

    with app.app_context():
        assert db.session.execute(
            "SELECT * FROM users WHERE email = 'a'",
        ).fetchone() is not None

    response2 = client.post("api/auth/get_token",
                            json={'email': 'a', 'password': 'a'})

    assert response2.status_code == 200


@pytest.mark.parametrize(('email', 'password', 'message'), (
    # ('', '', b'Username is required.'),
    # ('a', '', b'BadReques.'),
    ('test', 'test', b'user already exists'),
))
def test_register_validate_input(client, email, password, message):
    response = client.post(
        'api/auth/signup',
        json={'email': email, 'password': password}
    )
    assert message in response.data
