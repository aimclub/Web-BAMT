from dataclasses import dataclass
# from datetime import datetime

from app import db


@dataclass
class BayessianNet(db.Model):
    __tablename__ = 'nets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    owner = db.Column(db.String)

    edges = db.Column(db.String)
    nodes = db.Column(db.String)

    has_logit = db.Column(db.Boolean, default=False)
    use_mixture = db.Column(db.Boolean, default=False)
    scoring_function = db.Column(db.String)

    init_nodes = db.Column(db.Text)
    init_edges = db.Column(db.Text)
    white_list = db.Column(db.Text)
    bl_add = db.Column(db.Text)
    remove_init_edges = db.Column(db.Boolean, default=False)

    descriptor = db.Column(db.Text)
