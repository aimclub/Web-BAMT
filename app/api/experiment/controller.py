from flask_restx import Namespace, Resource
# from flask_accepts import accepts, responds

# from .schema import BNSchema
from .service import BN_learning, update_db, get_header_from_csv
from app.api.bn_manager.service import find_bns_by_user
from app.api.auth.service import find_user_by_email

from . import STORAGE
import ast
import os
import shutil

from werkzeug.exceptions import BadRequest, NotFound

api = Namespace("experiment", description="Operations with BNs")


@api.route("/<string:owner>/<string:name>/<int:case_id>/<bn_params>")
class BNResource(Resource):
    """
    BN Resource
    :param: case_id = 0 | 1
    """

    # @api.doc(responses={200: 'success'})
    # @api.doc(responses={400: 'failed'})
    # @responds(api=api, schema=BNResSchema)
    def get(self, owner, name, case_id, bn_params):
        """Train BN and sample from it, then save it to db"""
        try:
            bn_params = ast.literal_eval(bn_params)
        except Exception:
            raise BadRequest("Malformed string")

        if not find_user_by_email(email=owner):
            raise NotFound("User not found.")

        if not "use_mixture" in bn_params.keys():
            return {"message": "use_mixture not defined"}, 400
        elif not "has_logit" in bn_params.keys():
            return {"message": "has_logit not defined"}, 400
        elif not "scoring_function" in bn_params.keys():
            return {"message": "Scoring_func not defined"}, 400

        if not (case_id == 0 or case_id == 1):
            return {"message": "Not a case_id"}, 404

        if len(find_bns_by_user(owner=owner)) == 7:
            return {"message": "Limit of BNs has been reached."}, 406

        if case_id == 0:
            directory = r"data/hack_processed_with_rf.csv"
        elif case_id == 1:
            directory = r"data/vk_data.csv"

        # ======= Main =========
        result, status_code = BN_learning(directory=directory, parameters=bn_params)

        if status_code != 200:
            return result

        network, sample = result["network"], result["sample"]

        network_to_db = network | {"owner": owner, "name": name}
        network_to_db["nodes"] = str(network["nodes"])
        network_to_db["edges"] = str(network["edges"])
        network_to_db["descriptor"] = str(network["descriptor"])

        sample_to_db = {"sample": sample, "owner": owner, "net_name": name}

        update_db(network=network_to_db, sample=sample_to_db)

        # =========== Clearing memory ==============
        shutil.rmtree(os.path.join(STORAGE, owner))

        return {"network": network}


@api.route("/get_root_nodes/<int:case_id>")
class RootNodesResource(Resource):
    def get(self, case_id):
        """
        Return all possible root nodes
        """
        if case_id == 0:
            directory = r"data/hack_processed_with_rf.csv"
        elif case_id == 1:
            directory = r"data/vk_data.csv"
        else:
            raise BadRequest("Not a case id")
        return {"root_nodes": get_header_from_csv(directory)}
