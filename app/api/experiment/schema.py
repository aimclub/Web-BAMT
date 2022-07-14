from marshmallow import Schema, fields


class BNResSchema(Schema):
    """Bayesian Network schema"""
    class NetworkSchema(Schema):
        nodes = fields.List(cls_or_instance=fields.String)
        edges = fields.List(cls_or_instance=fields.List(cls_or_instance=fields.String))

    network = fields.Nested(NetworkSchema)
    sample = fields.Dict()