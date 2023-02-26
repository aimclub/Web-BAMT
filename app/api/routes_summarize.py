def register_routes(api, app):
    from app.api.experiment import register_routes as attach_experiment
    from app.api.auth import register_routes as attach_auth
    from app.api.htest import register_routes as attach_htest
    from app.api.bn_manager import register_routes as attach_bn_manager
    from app.api.example import register_routes as attach_example
    from app.api.data_manager import register_routes as attach_data_manager

    attach_htest(api=api, app=app)
    attach_experiment(api=api, app=app)
    attach_bn_manager(api=api, app=app)
    attach_auth(api=api, app=app)
    attach_example(api=api, app=app)
    attach_data_manager(api=api, app=app)