from flask_restx import Namespace, Resource
import ast

api = Namespace("experiment", description="Operations with BNs")


@api.route("/<int:case_id>/<string:bn_params>")
class BNResource(Resource):
    """
    BN Resource
    """

    @api.doc(responses={200: 'success'})
    @api.doc(responses={400: 'failed'})
    def get(self, case_id, bn_params):
        """Get trained BN"""
        bn_params = ast.literal_eval(bn_params)
        if not "use_mixture" in bn_params.keys():
            return False, 400
        elif not "has_logit" in bn_params.keys():
            return False, 400
        elif not "scoring_function" in bn_params.keys():
            return False, 400

        if not case_id == 0 or case_id == 1:
            return False, 404

        from .services import BN_learning

        if case_id == 0:
            directory = r"data/hack_processed_with_rf.csv"
        elif case_id == 1:
            directory = r"data/vk_data.csv"
        return BN_learning(directory=directory,
                           params=bn_params)
