from typing import Optional, Any, Dict
from flask import current_app
from werkzeug.security import generate_password_hash

import datetime
import jwt
import json

from .models import User

from app import db


def save_changes(data: Optional[Any] = None) -> None:
    if data:
        db.session.add(data)
    db.session.commit()


def find_user_by_email(email: str) -> Optional[User]:
    user = User.query.filter_by(email=email).first()
    return user


def create_user(email: str, password) -> User:
    password_hash: Optional[str] = None
    if password:
        password_hash = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password=password_hash)
    save_changes(new_user)
    return new_user


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
