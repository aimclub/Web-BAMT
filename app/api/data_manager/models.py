from dataclasses import dataclass

from sqlalchemy import JSON

from app import db


@dataclass
class Dataset(db.Model):
    __tablename__ = 'datasets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner = db.Column(db.String)

    location = db.Column(db.Text)
    map = db.Column(JSON)

    description = db.Column(db.Text)

    # hyperparams = db.Column(JSON)
    def __repr__(self):
        return f"Dataset(name='{self.name}', user='{self.owner}', loc='{self.location}')"
