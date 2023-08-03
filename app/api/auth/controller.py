from flask import request
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, Unauthorized
from werkzeug.security import check_password_hash

from .service import (
    create_user,
    find_user_by_username,
    generate_token,
    set_user_data,
    create_user_space,
)

api = Namespace("Auth", description="Token Operations")


@api.route("/get_token")
class AuthTokenResource(Resource):
    """auth"""

    @api.doc(responses={401: "check log data"})
    def post(self):
        """Authorize user.

        .. :quickref: AuthToken; Get Token

        :param username: user's name
        :param password: password

        :status codes:
            - **200 Success** - returns {"token": token}.
            - **400 Unauthorized** - NotFound or incorrect password
        """
        obtained = request.get_json()
        username = obtained["username"]
        password = obtained["password"]

        if not isinstance(username, str):
            raise BadRequest(f"{username.__class__}")

        user = find_user_by_username(username)
        if not user or not check_password_hash(user.password, password):
            raise Unauthorized("check login data")
        token = generate_token(user.id)

        return {"token": token}


@api.route("/signin")
class SignInResource(Resource):
    @api.doc(responses={401: "No User found"})
    def put(self):
        """Link token to user.

        .. :quickref: SignIn; Sign in

        :param username: user's name
        :param password: password
        :param token: token

        :status codes:
            - **200 Success**
            - **400 NotFound**
        """
        obtained = request.get_json()
        username = obtained["username"]
        token = obtained["token"]

        user = find_user_by_username(username)

        if not user:
            raise BadRequest("No users is found")

        set_user_data(user=user, token=token)
        return {"message": "Success"}


@api.route("/signup")
class RegisterResource(Resource):
    """Registration"""

    @api.doc(responses={200: "registration successful", 400: "user already exists"})
    @api.doc(params={"username": "name of user", "password": "password"})
    def post(self):
        """User registration.

        .. :quickref: Register; Registration

        :param username: user's name
        :param password: password

        :status codes:
            - **200 Success** - registration successful.
            - 400 Bad request
                  - Forbidden name
                  - Empty body
                  - User not found
                  - User already exists
        """
        obtained = request.get_json()
        if not "username" in obtained.keys() and "password" in obtained.keys():
            return {"message": "Request error."}, 400
        username = obtained["username"]
        password = obtained["password"]
        if not isinstance(username, str):
            return {"message": f"{username.__class__}"}, 400
        if username == "dev":
            return {"message": f"Forbidden name: {username}"}, 400
        user = find_user_by_username(username)
        if not user:
            create_user(username, password=password)
            create_user_space(username)
        else:
            raise BadRequest("user already exists")

        return {"message": "registration successful"}
