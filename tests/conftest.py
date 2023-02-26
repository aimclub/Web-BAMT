import os
import tempfile

import pytest

from app.api.data_manager.models import Dataset
from app import create_app, db


@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()

    package = {"location": "test_types_data.csv",
               "map":
                   {"node0": "float", "node1": "float", "node2": "float", "node3": "str",
                    "node4": "str", "node5": "str"},
               "name": "test_their",
               "owner": "test"}

    package_hack = {"location": r"../data/hack_processed_with_rf.csv",
                    "map": None,
                    "name": "hack",
                    "owner": "test"}

    package_vk = {"location": r"../data/vk_data.csv",
                  "map": None,
                  "name": "vk",
                  "owner": "test"}

    app = create_app("test")
    app.config["UPLOAD_FOLDER"] = "."
    with app.app_context():
        db.create_all(app=app)

        dataset_test = Dataset(**package)
        dataset_hack = Dataset(**package_hack)
        dataset_vk = Dataset(**package_vk)

        db.session.add(dataset_test)
        db.session.add(dataset_hack)
        db.session.add(dataset_vk)

        db.session.commit()

    yield app

    os.close(db_fd)
    os.unlink(db_path)

    # tear down
    with app.app_context():
        db.session.remove()
        db.drop_all()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def register_user(self, client):
        return self._client.post(
            'api/auth/signup', json={'email': 'test', 'password': 'a'}
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
            "dataset": "hack",
            "bn_params": {"has_logit": False,
                          "use_mixture": False,
                          "scoring_function": "K2"}
        }
        responce = self._client.get(
            f"api/experiment/{params['owner']}/{params['name']}/{params['dataset']}/{params['bn_params']}")
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
