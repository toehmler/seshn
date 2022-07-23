# api/post/post_controller.py

from flask import Blueprint, request, g
from flask_restx import Api, Resource, fields

from src.auth.auth_guards import authorization_guard
import src.api.post.post_service as post_service
import src.api.profile.profile_service as profile_service

post_bp = Blueprint('posts', __name__)
post_api = Api(post_bp)

post_model = post_api.model(
    'Post',
    {
        'id': fields.String(readonly=True),
        'profile_id': fields.String(readonly=True),
        'title': fields.String(required=True),
        'body': fields.String,
        'public': fields.Boolean,
        'created_at': fields.DateTime
    }
)

# post model for displaying post in feed or on another user's profile
public_post_model = post_api.model(
    'Post',
    {
        'id': fields.String(readonly=True),
        'profile_id': fields.String(readonly=True),
        'title': fields.String,
        'body': fields.String,
        'created_at': fields.DateTime,
        'username': fields.String
    }
)

# post model for displaying post on a user's profile (externally)
profile_post_model = post_api.model(
    'Post',
    {
        'id': fields.String(readonly=True),
        'title': fields.String,
        'body': fields.String,
        'created_at': fields.DateTime
    }
)



class Posts(Resource):

    # create new post
    @post_api.expect(post_model, validate=True)
    @post_api.marshal_with(post_model)
    @authorization_guard
    def post(self):
        # need internal profile id first
        profile_id = profile_service.get_profile_by_sub(g.access_token['sub']).id
        data = request.get_json()
        title = data.get('title')
        # TODO these could be null, need to check for null ptr errors
        body = data.get('body')
        public = data.get('public')
        post = post_service.create_post(profile_id, title, body, public)
        return post, 200

    # return all posts created by authenticated user
    @post_api.marshal_with(post_model, as_list=True)
    @authorization_guard
    def get(self):
        profile_id = profile_service.get_profile_by_sub(g.access_token['sub']).id
        posts = post_service.get_users_posts(profile_id)
        return posts.all(), 200


class PublicPosts(Resource):

    # get all public posts
    @post_api.marshal_with(public_post_model, as_list=True)
    def get(self):
        posts = post_service.get_all_public_posts().all()
        for post in posts:
            post.username = post.profile.username
        return posts, 200


class ProfilePosts(Resource):

    # get all public posts for a given profile

    @post_api.marshal_with(profile_post_model, as_list=True)
    @authorization_guard
    def get(self, profile_id):
        # check if profile id is that of current user
        sub = g.access_token['sub']
        profile = profile_service.get_profile_by_sub(sub)
        if profile.id == profile_id:
            posts = post_service.get_users_posts(sub)
            return posts, 200
        posts = post_service.get_profile_public_posts(profile_id)
        return posts.all(), 200


post_api.add_resource(Posts, '/posts/')
post_api.add_resource(PublicPosts, '/posts/all')
post_api.add_resource(ProfilePosts, '/posts/profile/<string:profile_id>')
