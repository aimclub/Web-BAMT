def register_routes(api, app):
    from app.api.experiment import register_routes as attach_experiment
    from app.api.auth import register_routes as attach_auth

    attach_experiment(api=api, app=app)
    attach_auth(api=api, app=app)
