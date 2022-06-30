from flask_restx import Namespace, Resource

api = Namespace("htest", description="Connection test")


@api.route("/health")
class HealthResons(Resource):
    def post(self):
        return {"status": "healthy"}
