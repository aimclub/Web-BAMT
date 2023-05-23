from marshmallow import Schema, fields


class BNGetNamesSchema(Schema):
    networks = fields.List(fields.String(metadata={'many': True}))


class SampleSchema(Schema):
    class DataSchema(Schema):
        data = fields.List(fields.Float)
        xvals = fields.List(fields.String)

    sampled_data = fields.Nested(DataSchema)
    real_data = fields.Nested(DataSchema)
