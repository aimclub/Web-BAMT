from marshmallow import Schema, fields


class UploadSchema(Schema):
    content = fields.Raw(required=True)
    name = fields.String(required=True)
    owner = fields.String(required=True)
