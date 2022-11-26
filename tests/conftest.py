import os
import tempfile

import pytest
from app import create_app, db


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()

    app = create_app("test")
    db.create_all(app=app)

    yield app

    os.close(db_fd)
    os.unlink(db_path)

    # tear down
    with app.app_context():
        # db.session.execute(
        #     """
        #     DROP TABLE users;
        #     """)
        db.session.remove()
        db.drop_all()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def register_user(self, client):
        return self._client.post(
            'api/auth/signup', json={'email': 'a', 'password': 'a'}
        )

    def login(self, username='test', password='test'):
        return self._client.post(
            'api/auth/signin',
            data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


class BNActions(object):
    def __init__(self, client):
        self._client = client

    def register_bn(self, user):
        params = {
            "owner": user,
            "name": "test",
            "case_id": 0,
            "bn_params": {"has_logit": False,
                          "use_mixture": False,
                          "scoring_function": "K2"}
        }
        responce = self._client.get(
            f"api/experiment/{params['owner']}/{params['name']}/{params['case_id']}/{params['bn_params']}")
        if responce.status_code != 200:
            raise Exception(f"Error on experiment: {responce.json}")
        else:
            return responce.json["network"]


@pytest.fixture()
def bn_actions(client):
    return BNActions(client)


@pytest.fixture
def auth(client):
    return AuthActions(client)


@pytest.fixture()
def client(app):
    client = app.test_client()
    client.post("api/auth/signup", json={"email": "test", "password": "test"})
    return client
