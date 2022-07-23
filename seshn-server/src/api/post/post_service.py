# api/post/post_service.py

from src import db
from src.api.post.post_model import Post


def create_post(profile_id, title, body, public) -> Post:
    post = Post(profile_id, title, body, public)
    db.session.add(post)
    db.session.commit()
    return post


def get_users_posts(profile_id):
    return Post.query.filter_by(profile_id=profile_id)


def get_all_public_posts():
    return Post.query.filter_by(public=True)


def get_profile_public_posts(profile_id):
    return Post.query.filter_by(profile_id=profile_id).filter_by(public=True)

