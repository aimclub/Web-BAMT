BASE_ROUTE = "api/data_manager"


def register_routes(api, app):
    from .controller import api as data_manager_api

    api.add_namespace(data_manager_api, path=f"/{BASE_ROUTE}")
