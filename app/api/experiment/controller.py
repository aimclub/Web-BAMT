import ast
import os
import shutil

from flask import request
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, NotFound

from app.api.auth.service import find_user_by_username
from app.api.bn_manager.service import find_bns_by_user
from . import STORAGE
from .service import bn_learning, Sampler, Manager, is_default_cached
from .str2callable import regressors, classifiers

from app.api.experiment.schema import BNSchema

api = Namespace("experiment", description="Operations with BNs")


@api.route("/<string:owner>/<string:name>/<string:dataset>/<bn_params>")
class BNResource(Resource):
    """
    BN Resource
    """
    @api.doc(params={"owner": "name of user",
                     "name": "name of net",
                     "dataset": "name of dataset",
                     "bn_params":
                         """
                         {"scoring_function": str, 
                         "use_mixture": str or bool, 
                         "has_logit": str or bool,
                         "classifier": str or None,
                         "regressor": str or None,
                         "compare_with_default": str or bool,
                         "params": {"remove_init_edges": bool or None,
                                 "init_edges": List[List[str]] or None,
                                 "init_nodes": List[str] or None
                                 }
                         }
                         """})
    def get(self, owner, name, dataset, bn_params):
        """Train BN and sample from it, then save it to db.

        :param owner: bn's owner
        :param name: name of bayessian network
        :param dataset: dataset name
        :param bn_params: additional parameters

        .. :quickref: BN; Train bayessian network

        bn_params json:
         .. code-block:: json

            {
                "scoring_function": "K2",
                "use_mixture": "true" or True,
                "has_logit": "true" or True,
                "classifier": "LogisticRegression",
                "regressor": "LinearRegression",
                "compare_with_default": "true" or True,
                "params": {
                            "remove_init_edges": "true" or True or None,
                            "init_edges": [["node1", "node2"], ["node2", "node3"], ["node3", "node4"]] or None,
                            "init_nodes": ["node3", "node4"] or None
                           }
            }

        :status codes:
            - **200 Success** - returns trained network data (see below)
            - **400 Bad request** -
                - net name is too big
                - use_mixture of has_logit or both or scoring_function is not defined
            - **404 NotFound** - User is not found
            - **406** - bn's limit reached
            - **422** - check for uniqueness of name failed
            - **500** - server error

        network json:
         .. code-block:: json

            {
                "network":
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
                                    "white_list": FROZEN FEATURE,
                                    "bl_add": FROZEN FEATURE,
                                    "remove_init_edges": bool or none},
                         "scoring_function": str,
                         "descriptor": str, string with dictionary with pairs
                         }
            }
        """
        try:
            bn_params = BNSchema(partial=("params",)) \
                .load(data=ast.literal_eval(bn_params))
        except Exception:
            raise BadRequest("Malformed string")

        if not find_user_by_username(username=owner):
            raise NotFound("User not found.")

        if len(find_bns_by_user(owner=owner)) > 7:
            return {"message": "Limit of BNs has been reached."}, 406

        if name in [bn.name for bn in find_bns_by_user(owner)]:
            return {"message": "Net name must be unique"}, 422

        if len(name) > 35:
            return {"message": "Net name is too big."}, 400

        if not "use_mixture" in bn_params.keys():
            return {"message": "use_mixture not defined"}, 400

        elif not "has_logit" in bn_params.keys():
            return {"message": "has_logit not defined"}, 400

        elif not "scoring_function" in bn_params.keys():
            return {"message": "Scoring_func not defined"}, 400

        if bn_params.get("compare_with_default", False):
            if is_default_cached(owner, net_name=name, dataset_name=dataset):
                bn_params.pop("compare_with_default")

        # ======= Main =========
        result = bn_learning(dataset=dataset, parameters=bn_params, user=owner)

        if result[-1] != 200:
            return result

        bn, bn_default, df_shape, status_code = result

        sampler = Sampler()
        samples = sampler.sample(df_shape, bn, bn_default)

        manager = Manager(bn, samples, owner=owner,
                          net_name=name, dataset_name=dataset)
        manager.save_samples()

        package = manager.packing(bn_params)
        manager.update_db(*package)

        # =========== Clearing memory of joblib models ==============
        if os.path.isdir(os.path.join(STORAGE, owner)):
            shutil.rmtree(os.path.join(STORAGE, owner))

        return {"network": package[0]}, status_code


@api.route("/get_models")
class ModelsResource(Resource):
    @api.doc(responces={"models": "List of available models"})
    @api.doc(params={"model_type": "regressor or classifier"})
    def get(self):
        """Get available models for nodes.

        :param model_type: str, "regressor" or "classifier"

        .. :quickref: Models; Get available models

        :status codes:
            - **200** - list with models as strings
            - **500** - server error
        """
        model_type = request.args.get("model_type")
        models = classifiers if model_type == "classifier" else regressors
        return {"models": list(models)}, 200
