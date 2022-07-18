from marshmallow import Schema, fields


class ExampleSchema(Schema):
    descriptor = fields.Dict(keys=fields.String(), values=fields.String())
    edges = fields.List(fields.List(fields.String))
    nodes = fields.List(fields.String)