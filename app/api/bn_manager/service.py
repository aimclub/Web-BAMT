from app.api.experiment.models import BayessianNet, Sample
from app import db


def find_bns_by_user(owner):
    nets = BayessianNet.query.filter_by(owner=owner).all()
    return nets


def find_bns_by_owner_and_name(owner, name):
    return BayessianNet.query.filter_by(owner=owner, name=name).all()


def find_bn_names_by_user(owner):
    return BayessianNet.query.filter_by(owner=owner).with_entities(BayessianNet.name)


def find_sample(owner, name):
    return Sample.query.filter_by(owner=owner, net_name=name).with_entities(Sample.sample).first()


def remove_samples(owner, name):
    Sample.query.filter_by(owner=owner, net_name=name).delete()
    db.session.commit()


def remove_bn(owner, name):
    BayessianNet.query.filter_by(owner=owner, name=name).delete()
    db.session.commit()
