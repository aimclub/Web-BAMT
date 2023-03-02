from marshmallow import Schema, fields


class UploadSchema(Schema):
    name = fields.String(required=True)
    owner = fields.String(required=True)
    description = fields.String(required=True)
