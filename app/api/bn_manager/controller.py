import ast
import json

from flask_accepts import responds
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, NotFound

from .schema import BNGetNamesSchema, SampleSchema
from .service import find_bns_by_user, remove_bn, find_bns_by_owner_and_name, find_bn_names_by_user, find_sample, \
    remove_samples
from app.api.auth.service import find_user_by_email

api = Namespace("BN_manager", description="BN store operations")


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
        """Delete bn and her samples"""

        if not find_bns_by_owner_and_name(owner=owner, name=name):
            raise NotFound("No net was found")

        remove_bn(owner=owner, name=name)
        remove_samples(owner=owner, name=name)
        return {"message": "Success"}


@api.route("/get_sample/<string:owner>/<string:name>/<string:node>")
class BNManagerResource(Resource):
    @responds(schema=SampleSchema, api=api)
    # @api.doc(responses={401: 'No User found'})
    def get(self, owner, name, node):
        """Get real and sampled data"""
        if not find_sample(owner=owner, name=name):
            raise NotFound("Sample does not exist.")

        sample = find_sample(owner=owner, name=name)[0]
        node_sample = sample[node]

        if "Gross" in sample.keys():
            case_id = 0
        else:
            case_id = 1
        location = f"data/{case_id}_sample.json"

        with open(location) as f:
            real_node = json.load(f)[node]

        return {"sampled_data": node_sample, "real_data": real_node}
