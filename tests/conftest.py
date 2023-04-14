import pytest

from app.api.data_manager.models import Dataset
from app import create_app, db
from shutil import rmtree


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def register_user(self):
        return self._client.post(
            'api/auth/signup', json={'username': 'test', 'password': 'a'}
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

    def register_bn(self, params=None):
        if not params:
            params = {
                "owner": "test",
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


@pytest.fixture()
def auth(client):
    return AuthActions(client)


@pytest.fixture(scope="session")
def app():
    dataset_hack = Dataset(name="hack",
                           owner="dev",
                           location="data/hack_processed_with_rf.csv",
                           map={'Tectonic regime': 'str', 'Period': 'str', 'Lithology': 'str',
                                'Structural setting': 'str', 'Gross': 'float', 'Netpay': 'float',
                                'Porosity': 'float',
                                'Permeability': 'float', 'Depth': 'float'})

    dataset_vk = Dataset(name="vk",
                         owner="dev",
                         location="data/vk_data.csv",
                         map={'age': 'float', 'sex': 'str', 'has_pets': 'str', 'is_parent': 'str',
                              'relation': 'str',
                              'is_driver': 'str', 'tr_per_month': 'float', 'median_tr': 'float',
                              'mean_tr': 'float'})

    app = create_app("test")

    with app.app_context():
        db.create_all(app=app)

        db.session.add(dataset_hack)
        db.session.add(dataset_vk)

        db.session.commit()

    yield app

    for dst in [app.config["DATASETS_FOLDER"], app.config["SAMPLES_FOLDER"]]:
        rmtree(dst)

    # tear down
    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture(scope="module", autouse=True)
def initialize_bn_and_user(app):
    client = app.test_client()

    bn_actions = BNActions(client=client)
    auth_actions = AuthActions(client=client)

    auth_actions.register_user()
    bn_actions.register_bn()


@pytest.fixture()
def client(app):
    client = app.test_client()
    return client
