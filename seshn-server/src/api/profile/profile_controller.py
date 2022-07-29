# api/profile/profile_controller.py

from flask import request, g
from flask_restx import Resource, fields, Namespace

from src.auth.auth_guards import authorization_guard
import src.api.profile.profile_service as profile_service


api = Namespace('profile', description="Profile related operations")


profile_model = api.model(
    'profile',
    {
        'id': fields.String(readonly=True),
        'sub': fields.String,
        'username': fields.String,
        'email': fields.String,
    }
)


@api.route('/register')
class CreateProfile(Resource):

    # create profile using access token in auth header
    @authorization_guard
    @api.marshal_with(profile_model)
    def get(self):
        # check if user already stored (NOTE: only checks unique sub)
        # this means one user could have multiple accts through diff id providers
        # TODO: check against sub and email for duplicates
        profile = profile_service.get_profile_by_sub(g.access_token['sub'])
        # might make sense to update if profile already exists
        if not profile:
            auth_header = request.headers.get("Authorization", None)
            profile = profile_service.create_profile(auth_header)
        return profile, 200


