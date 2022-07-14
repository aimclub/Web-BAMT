from flask_restx import Namespace, Resource

api = Namespace("htest", description="Connection test")


@api.route("/health")
class HealthResource(Resource):
    def get(self):
        return {"status": "healthy"}
