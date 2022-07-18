from flask import request
import ast
from flask_accepts import accepts, responds
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, NotFound

from .schema import BNSchema, BNGetNamesSchema
from .service import update_db, find_bns_by_user, remove_bn, find_bns_by_owner_and_name, find_bn_names_by_user
from app.api.auth.service import find_user_by_email

api = Namespace("BN_manager", description="BN store operations")


@api.route("/assign_BN")
class BNManagerResource(Resource):
    @accepts(schema=BNSchema, api=api)
    # @api.doc(responses={401: 'No User found'})
    def put(self):
        """Assign new BN to user."""
        obtained = request.get_json()

        obtained["nodes"] = str(obtained["nodes"])
        obtained["edges"] = str(obtained["edges"])
        obtained["descriptor"] = str(obtained["descriptor"])

        if "params" in obtained.keys():
            if "init_nodes" in obtained["params"].keys():
                obtained["params"]["init_nodes"] = str(obtained["params"]["init_nodes"])
            if "init_edges" in obtained["params"].keys():
                obtained["params"]["init_edges"] = str(obtained["params"]["init_edges"])
            # params unpacking
            for k, v in obtained['params'].items():
                if k != "remove_init_edges":
                    val = str(v)
                else:
                    val = v
                obtained[k] = str(val)
            del obtained["params"]
        # for value in ast.literal_eval(obtained["edges"]):
        #     if not any([type(i) == str for i in value]):
        #         raise BadRequest("TypeError in edges")
        #
        # if not any([type(i) == str for i in ast.literal_eval(obtained["nodes"])]):
        #     raise BadRequest("TypeError in nodes")

        # if not find_user_by_token(token=obtained["token"]):
        #     raise BadRequest("No user (token) was found")

        if len(find_bns_by_user(owner=obtained["owner"])) == 7:
            return {"message": "Limit of BNs has been reached."}, 406

        update_db(data=obtained)
        return {"message": "Success"}


@api.route("/get_BN/<string:owner>")
class BNManagerResource(Resource):
    # @responds(schema=BNGetSchema0)
    # @api.doc(responses={401: 'No User found'})
    def get(self, owner):
        """Get BN Data"""

        # if not find_user_by_token(token=obtained["token"]):
        #     raise BadRequest("No token was found")
        nets = find_bns_by_user(owner=owner)
        return {"networks": {n: {
            "name": data.name,
            "edges": ast.literal_eval(data.edges),
            "nodes": ast.literal_eval(data.nodes),
            "use_mixture": data.use_mixture,
            "has_logit": data.has_logit,
            "params": {"init_edges": ast.literal_eval(data.init_edges) if data.init_edges else None,
                       "init_nodes": ast.literal_eval(data.init_nodes) if data.init_nodes else None,
                       # "white_list": data.white_list,
                       # "bl_add": data.bl_add,
                       "remove_init_edges": data.remove_init_edges},
            "scoring_function": data.scoring_function,
            "descriptor": ast.literal_eval(data.descriptor)} for n, data in enumerate(nets)}}


@api.route("/get_BN_names/<string:owner>")
class BNGetNamesManagerResource(Resource):
    @responds(schema=BNGetNamesSchema, status_code=200, api=api)
    def get(self, owner):
        """Get BN names to validate uniqueness"""

        if not find_user_by_email(owner):
            raise BadRequest("No user was found")

        names = find_bn_names_by_user(owner=owner)
        return {"networks": [data[0] for data in names]}


@api.route("/remove/<string:owner>/<string:name>")
class BNManagerResource(Resource):
    # @accepts(api=api)
    # @api.doc(responses={401: 'No User found'})
    def delete(self, owner, name):
        """Delete bn"""

        if not find_bns_by_owner_and_name(owner=owner, name=name):
            raise NotFound("No net was found")

        remove_bn(owner=owner, name=name)
        return {"message": "Success"}
