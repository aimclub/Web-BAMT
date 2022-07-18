from flask_restx import Namespace, Resource
from flask_accepts import responds

from .schema import ExampleSchema
import json

from werkzeug.exceptions import BadRequest

api = Namespace("example", description="Operations for example page")


@api.route("/get_example/<int:case_id>")
class BNManagerResource(Resource):
    @responds(schema=ExampleSchema, api=api)
    def get(self, case_id):
        """Get pretrained bn"""
        if not case_id in [0, 1]:
            raise BadRequest(description="Not a case_id")

        file = f"data/{case_id}_net.json"

        with open(file) as f:
            net = json.load(f)

        return net
