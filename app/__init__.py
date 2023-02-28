from flask import Flask
import os
from flask_restx import Api

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app(env=None):
    from app.config import config_by_name
    template_dir = os.path.abspath('frontend/build')
    static_dir = os.path.abspath('frontend/build/static')

    app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_object(config_by_name[env or "dev"])
    api = Api(app)

    db.init_app(app=app)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    datasets_dst = os.path.abspath(app.config['DATASETS_FOLDER'])
    if not os.path.isdir(datasets_dst):
        os.mkdir(datasets_dst)

    samples_dst = os.path.abspath(app.config['SAMPLES_FOLDER'])
    if not os.path.isdir(samples_dst):
        os.mkdir(samples_dst)

    from app.api.routes_summarize import register_routes
    register_routes(api=api, app=app)

    from flask_seeder import FlaskSeeder

    seeder = FlaskSeeder()
    seeder.init_app(app, db)

    return app
