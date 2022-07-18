from .models import BayessianNet
from app import db


def update_db(data: dict):
    bn = BayessianNet(**data)
    db.session.add(bn)
    db.session.commit()


def find_bns_by_user(owner):
    nets = BayessianNet.query.filter_by(owner=owner).all()
    return nets


def find_bns_by_owner_and_name(owner, name):
    return BayessianNet.query.filter_by(owner=owner, name=name).all()


def find_bn_names_by_user(owner):
    return BayessianNet.query.filter_by(owner=owner).with_entities(BayessianNet.name)


def remove_bn(owner, name):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
