from .models import BayessianNet
from app import db


def update_db(data: dict):
    bn = BayessianNet(**data)
    db.session.add(bn)
    db.session.commit()


def find_bns_by_token(owner):
    nets = BayessianNet.query.filter_by(owner=owner).all()
    return nets

def remove_bn(owner, name):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
