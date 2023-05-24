BASE_ROUTE = "api/bn_manager"


def register_routes(api, app):
    from .controller import api as bn_manager_api

    api.add_namespace(bn_manager_api, path=f"/{BASE_ROUTE}")
