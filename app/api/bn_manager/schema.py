from marshmallow import Schema, fields


class BNSchema(Schema):
    """Bayesian Network schema"""
    nodes = fields.String(attribute='nodes', required=True)
    edges = fields.String(attribute='edges', required=True)
    owner = fields.String(attribute='owner', required=True)
    name = fields.String(required=True)

    use_mixture = fields.Boolean(attribute='use_mixture', default=False)
    has_logit = fields.Boolean(attribute='has_logit', default=False)
    scoring_function = fields.String(attribute='scoring_function')

    params = fields.Dict(
        default={"init_nodes": fields.String, "init_edges": fields.String, "white_list": fields.String, "bl_add": fields.String, "remove_init_edges": fields.Boolean()})


class BNGetSchema(Schema):
    owner = fields.String(attribute='owner')
