# api/profile/profile_model.py


from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid

from src import db


class Profile(db.Model):

    __tablename__ = 'profiles'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sub = db.Column(db.String(128), nullable=False)
    username = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, sub, username, email):
        self.sub = sub
        self.username = username
        self.email = email
