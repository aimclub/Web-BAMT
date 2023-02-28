from typing import Optional, Any, Dict
from flask import current_app
from werkzeug.security import generate_password_hash

import datetime
import jwt
import json
import os

from .models import User

from app import db


def save_changes(data: Optional[Any] = None) -> None:
    if data:
        db.session.add(data)
    db.session.commit()


def find_user_by_username(username: str) -> Optional[User]:
    user = User.query.filter_by(username=username).first()
    return user


def find_user_by_token(token: str) -> Optional[User]:
    return User.query.filter_by(tokens=token).first()


def create_user(username: str, password) -> User:
    password_hash: Optional[str] = None
    if password:
        password_hash = generate_password_hash(password, method='sha256')
    new_user = User(username=username, password=password_hash)
    save_changes(new_user)
    return new_user

def create_user_space(user):
    dst = os.path.join(current_app.config["DATASETS_FOLDER"], user)
    if not os.path.isdir(dst):
        os.mkdir(os.path.join(current_app.config["DATASETS_FOLDER"], user))

    dst = os.path.join(current_app.config["SAMPLES_FOLDER"], user)
    if not os.path.isdir(dst):
        os.mkdir(os.path.join(current_app.config["SAMPLES_FOLDER"], user))

def set_user_data(user: User, token: Dict[str, Any]) -> None:
    # user.name = user_data['name']
    user.tokens = json.dumps(token)
    # user.avatar = user_data['picture']
    save_changes(user)


def generate_token(user_id: int) -> str:
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        current_app.config.get('SECRET_KEY'),
        algorithm='HS256'
    )
