# api/post/post_model.py

from sqlalchemy import ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid

from src import db


class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = db.Column(UUID(as_uuid=True), ForeignKey("profiles.id"))
    title = db.Column(db.String(256), nullable=False)
    body = db.Column(db.Text)
    public = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
    profile = db.relationship("Profile")

    def __init__(self, profile_id, title, body="", public=True):
        self.profile_id = profile_id
        self.title = title
        self.body = body
        self.public = public
