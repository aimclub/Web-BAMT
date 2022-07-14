from flask import request
import ast
from flask_accepts import accepts
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest

# from .models import
from .schema import BNSchema, BNGetSchema
from .service import update_db, find_bns_by_token

# from app.api.auth.service import find_user_by_token

api = Namespace("BN_manager", description="BN store operations")


@api.route("/assign_BN")
class BNManagerResource(Resource):
    @accepts(schema=BNSchema, api=api)
    # @api.doc(responses={401: 'No User found'})
    def put(self):
        """Assign new BN to user. In current version - to user's session"""
        obtained = request.get_json()

        for value in ast.literal_eval(obtained["edges"]):
            if not any([type(i) == str for i in value]):
                raise BadRequest("TypeError in edges")

        if not any([type(i) == str for i in ast.literal_eval(obtained["nodes"])]):
            raise BadRequest("TypeError in vertices")

        # if not find_user_by_token(token=obtained["token"]):
        #     raise BadRequest("No user (token) was found")

        for k, v in obtained['params'].items():
            if k != "remove_init_edges":
                val = str(v)
            else:
                val = v
            obtained[k] = str(val)
        del obtained["params"]

        update_db(data=obtained)
        return {"message": "Success"}


@api.route("/get_BN")
class BNManagerResource(Resource):
    @accepts(schema=BNGetSchema, api=api)
    # @api.doc(responses={401: 'No User found'})
    def post(self):
        """Get BN Data"""
        obtained = request.get_json()

        # if not find_user_by_token(token=obtained["token"]):
        #     raise BadRequest("No token was found")

        nets = find_bns_by_token(owner=obtained["owner"])
        return {"networks": {n: {
            "name": data.name,
            "edges": data.edges,
            "nodes": data.nodes,
            "use_mixture": data.use_mixture,
            "has_logit": data.has_logit,
            "params": {"init_edges": data.init_edges,
                       "init_nodes": data.init_nodes,
                       "white_list": data.white_list,
                       "bl_add": data.bl_add,
                       "remove_init_edges": data.remove_init_edges},
            "scoring_function": data.scoring_function} for n, data in enumerate(nets)}}
