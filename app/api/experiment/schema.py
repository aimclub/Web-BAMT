from marshmallow import Schema, fields


class BNResSchema(Schema):
    """Bayesian Network schema"""

    class NetworkSchema(Schema):
        nodes = fields.List(cls_or_instance=fields.String)
        edges = fields.List(cls_or_instance=fields.Tuple((fields.String, fields.String)))

    network = fields.Nested(NetworkSchema)
    sample = fields.Dict()


class ParamsSchema(Schema):
    init_nodes = fields.List(cls_or_instance=fields.String)
    init_edges = fields.List(cls_or_instance=fields.List(fields.String))
    # white_list = fields.String()
    # bl_add = fields.String()
    remove_init_edges = fields.Boolean(default=False)


class BNSchema(Schema):
    """Bayesian Network schema"""
    # nodes = fields.List(cls_or_instance=fields.String, required=True)
    # edges = fields.List(cls_or_instance=fields.List(fields.String), required=True)
    # owner = fields.String(attribute='owner', required=True)
    # name = fields.String(required=True)

    use_mixture = fields.Boolean(attribute='use_mixture', default=False)
    has_logit = fields.Boolean(attribute='has_logit', default=False)
    scoring_function = fields.String(attribute='scoring_function')

    params = fields.Nested(ParamsSchema)

    # descriptor = fields.Dict(required=True)
