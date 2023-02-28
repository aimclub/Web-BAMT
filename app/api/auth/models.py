from dataclasses import dataclass
# from datetime import datetime

from flask_login import UserMixin

from app import db


@dataclass
class Token:
    token_value: str


@dataclass
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    # name = db.Column(db.String(1000))
    # avatar = db.Column(db.String(200))
    # active = db.Column(db.Boolean, default=False)
    tokens = db.Column(db.Text)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow())
