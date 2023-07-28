import ast
from io import BytesIO
from json import dumps

from flask import request, send_file
from flask_accepts import responds
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, NotFound

from app.api.auth.service import find_user_by_username
from .schema import BNGetNamesSchema
from .service import (
    find_bns_by_user,
    remove_bn,
    find_bns_by_owner_and_name,
    find_bn_names_by_user,
    find_sample,
    remove_samples,
    find_edges_by_owner_and_nets_names,
    SampleWorker,
)

api = Namespace("BN_manager", description="BN store operations")


@api.route("/get_BN/<string:owner>")
class BNManagerResource(Resource):
    @api.doc(
        responses={
            200: """
            {"networks": 
                {"number": {
                    "name": name of net,
                    "dataset_name": name of dataset bn trained on,
                    "edges": edges,
                    "nodes": nodes,
                    "use_mixture": bool,
                    "has_logit": bool,
                    "classifier": str,
                    "regressor": str,
                    "params": {"init_edges": None or List[List[str]],
                               "init_nodes": None or List[str],
                               "white_list": EXPERIMENTAL: not used yet,
                               "bl_add": EXPERIMENTAL: not used yet,
                               "remove_init_edges": bool or none},
                    "scoring_function": str,
                    "descriptor": str}}
            }"""
        }
    )
    def get(self, owner):
        """Get BN Data"""

        # if not find_user_by_token(token=obtained["token"]):
        #     raise BadRequest("No token was found")
        nets = find_bns_by_user(owner=owner)

        return {
            "networks": {n: net.unpack()["network"] for n, net in enumerate(nets)}
        }, 200


@api.route("/download_BN")
class BNDownloaderResource(Resource):
    @api.doc(
        responses={
            200: """
            {"network": 
                {
                    "name": name of net,
                    "dataset_name": name of dataset bn trained on,
                    "edges": edges,
                    "nodes": nodes,
                    "use_mixture": bool,
                    "has_logit": bool,
                    "classifier": str,
                    "regressor": str,
                    "params": {"init_edges": None or List[List[str]],
                               "init_nodes": None or List[str],
                               "white_list": EXPERIMENTAL: not used yet,
                               "bl_add": EXPERIMENTAL: not used yet,
                               "remove_init_edges": bool or none},
                    "scoring_function": str,
                    "descriptor": str}
            }"""
        }
    )
    @api.doc(params={"user": "username", "bn_name": "name of bn"})
    def get(self):
        """Download BN"""

        user = request.args.get("user", None)
        bn_name = request.args.get("bn_name", None)

        if not (user and bn_name):
            raise BadRequest("User or bn_name wasn't found.")

        if not find_user_by_username(username=user):
            raise NotFound("User not found.")

        nets = find_bns_by_owner_and_name(owner=user, name=bn_name)
        if not nets:
            raise NotFound("Network was not found.")

        file = BytesIO(dumps(nets[0].unpack()).encode("utf-8"))
        return send_file(
            path_or_file=file,
            mimetype="application/octet-stream",
            download_name=f"{bn_name}.json",
            as_attachment=True,
        )


@api.route("/get_BN_names/<string:owner>")
class BNGetNamesManagerResource(Resource):
    @responds(schema=BNGetNamesSchema, status_code=200, api=api)
    def get(self, owner):
        """Get BN names to validate uniqueness"""

        if not find_user_by_username(owner):
            raise BadRequest("No user was found")

        names = find_bn_names_by_user(owner=owner)
        return {"networks": [data[0] for data in names]}


@api.route("/remove/<string:owner>/<string:name>")
class BNRemoverResource(Resource):
    # @accepts(api=api)
    # @api.doc(responses={401: 'No User found'})
    def delete(self, owner, name):
        """Delete bn and her samples"""

        if not find_bns_by_owner_and_name(owner=owner, name=name):
            raise NotFound("No net was found")

        remove_bn(owner=owner, name=name)
        remove_samples(owner=owner, name=name)
        return {"message": "Success"}


@api.route(
    "/get_display_data/<string:owner>/<string:net_name>/<string:dataset_name>/<string:node>"
)
class SamplerResource(Resource):
    @api.doc(responses={401: "No User found"})
    @api.doc(
        responses={
            200: """
    {'data': List, 
     'xvals': List,
     'metrics': {metric: val},
     'type': Str}
                              """
        }
    )
    def get(self, owner, net_name, dataset_name, node):
        """Get real and sampled data"""
        if not find_sample(owner, net_name):
            return {"message": "Sample not found in database."}, 404
        worker = SampleWorker(owner, net_name, dataset_name, node)

        display = worker.get_display()
        status_code = 400 if "error" in display.keys() else 200
        return display, status_code


@api.route("/get_equal_edges")
class BNAnalyserResource(Resource):
    @api.doc(params={"names": "List[str], names of nets", "owner": "net holder name"})
    def get(self):
        """get different edges between 2 nets"""
        names = request.args.get("names", None)
        owner = request.args.get("owner", None)

        if not (names and owner):
            return {"message": "request error."}, 400

        names = ast.literal_eval(names)
        out = find_edges_by_owner_and_nets_names(owner=owner, names=names)

        if len(out) != 2:
            return {"message": "Nets weren't found."}, 404

        edges = []
        for i_net in range(len(out)):
            edges.append(ast.literal_eval(out[i_net][0]))

        edges0 = set(map(tuple, edges[0]))
        edges1 = set(map(tuple, edges[1]))

        return {"equal_edges": list(edges0.intersection(edges1))}
