from flask import Flask
import os
from flask_restx import Api

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(env=None):
    from app.config import config_by_name
    template_dir = os.path.abspath('frontend/build')
    static_dir = os.path.abspath('frontend/build/static')

    app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
    app.config.from_object(config_by_name[env or "dev"])
    api = Api(app)

    db.init_app(app=app)

    from app.api.routes_summarize import register_routes
    register_routes(api=api, app=app)

    return app
