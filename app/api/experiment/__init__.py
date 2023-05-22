from bamt_special.config import config
STORAGE = config.get('NODES', 'models_storage', fallback='models_storage is not defined')

BASE_ROUTE = "api/experiment"


def register_routes(api, app):
    from .controller import api as model_api

    api.add_namespace(model_api, path=f"/{BASE_ROUTE}")