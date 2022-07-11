# from typing import Dict

from flask import request
from flask_accepts import accepts
from flask_restx import Namespace, Resource
from werkzeug.exceptions import BadRequest, Unauthorized
from werkzeug.security import check_password_hash

# from .models import Token
from .schema import UserSchema, TokenSchema
from .service import create_user, find_user_by_email, generate_token, set_user_data

api = Namespace("Auth", description="Token Operations")


@api.route("/get_token")
class AuthTokenResource(Resource):
    """auth"""

    @accepts(schema=UserSchema, api=api)
    @api.doc(responses={401: 'check log data'})
    def post(self):
        """Get token by user login data"""
        obtained = request.get_json()
        email = obtained['email']
        password = obtained['password']

        if not isinstance(email, str):
            raise BadRequest(f"{email.__class__}")

        user = find_user_by_email(email)
        if not user or not check_password_hash(user.password, password):
            raise Unauthorized("check login data")
        # print(user.id)
        token = generate_token(user.id)
        # print(token)

        return {"token": token}


@api.route("/signin")
class SignInResource(Resource):
    @accepts(schema=TokenSchema, api=api)
    @api.doc(responses={401: 'No User found'})
    def put(self):
        """Link token to user"""
        obtained = request.get_json()
        email = obtained["email"]
        token = obtained["token"]

        user = find_user_by_email(email)

        if not user:
            raise BadRequest("No users is found")

        set_user_data(user=user, token=token)
        return {"message": "Success"}


@api.route("/signup")
class RegisterResource(Resource):
    """Registration"""

    @accepts(schema=UserSchema, api=api)
    @api.doc(responses={200: 'registration successful'})
    @api.doc(responses={400: 'user already exists'})
    def post(self):
        """User registration"""
        obtained = request.get_json()
        email = obtained['email']
        password = obtained['password']
        if not isinstance(email, str):
            raise BadRequest(f"{email.__class__}")
        user = find_user_by_email(email)
        if not user:
            create_user(email, password=password)
        else:
            raise BadRequest("user already exists")

        return {"message": "registration successful"}
