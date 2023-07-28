from marshmallow import Schema, fields


class UserSchema(Schema):
    """User schema"""

    username = fields.String(attribute="username")
    password = fields.String(attribute="password")


class TokenSchema(Schema):
    email = fields.String(attribute="email")
    token = fields.String(attribute="token")
