# api/post/post_controller.py

from flask import Blueprint, request, g
from flask_restx import Api, Resource, fields, Namespace

from src.auth.auth_guards import authorization_guard
import src.api.post.post_service as post_service
import src.api.profile.profile_service as profile_service

api = Namespace('post', description="profile related operations")

post_model = api.model(
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
public_post_model = api.model(
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
profile_post_model = api.model(
    'Post',
    {
        'id': fields.String(readonly=True),
        'title': fields.String,
        'body': fields.String,
        'created_at': fields.DateTime
    }
)

@api.route('/')
class Posts(Resource):

    # create new post
    @api.expect(post_model, validate=True)
    @api.marshal_with(post_model)
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
    @api.marshal_with(post_model, as_list=True)
    @authorization_guard
    def get(self):
        profile_id = profile_service.get_profile_by_sub(g.access_token['sub']).id
        posts = post_service.get_users_posts(profile_id)
        return posts.all(), 200

@api.route('/all', endpoint='posts/all')
class PublicPosts(Resource):

    # get all public posts
    @api.marshal_with(public_post_model, as_list=True)
    def get(self):
        posts = post_service.get_all_public_posts().all()
        for post in posts:
            post.username = post.profile.username
        return posts, 200


@api.route('/profile/<string:profile_id>')
class ProfilePosts(Resource):

    # get all public posts for a given profile

    @api.marshal_with(profile_post_model, as_list=True)
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
