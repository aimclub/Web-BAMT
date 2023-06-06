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

    # @api.doc(responses={200: 'success'})
    # @api.doc(responses={400: 'failed'})
    @api.doc(params={"owner": "name of user",
                     "name": "name of net",
                     "dataset": "name of dataset",
                     "bn_params":
                         """
                         {"scoring_function": str, 
                         "use_mixture": bool, 
                         "has_logit": bool,
                         "classifier": str or None,
                         "regressor": str or None,
                         "compare_with_default": bool,
                         "params": {"remove_init_edges": bool or None,
                                 "init_edges": List[List[str]] or None,
                                 "init_nodes": List[str] or None
                                 }
                         }
                         """})
    def get(self, owner, name, dataset, bn_params):
        """
        Train BN and sample from it, then save it to db.

        Note that if you need to learn
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

        # ======= Main =========
        if bn_params.get("compare_with_default", False):
            if is_default_cached(owner, net_name=name, dataset_name=dataset):
                bn_params.pop("compare_with_default")

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
        model_type = request.args.get("model_type")
        models = classifiers if model_type == "classifier" else regressors
        return {"models": list(models)}, 200
