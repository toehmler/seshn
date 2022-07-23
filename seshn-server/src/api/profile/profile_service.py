# api/profile/profile_service.py

import os
import requests

from src import db
from src.api.profile.profile_model import Profile


# get profile details auth0 and save to db
def create_profile(access_token) -> Profile:
    # TODO: update to prevent duplicates and error checking
    auth0_profile = __get_auth0_profile(access_token)
    sub = auth0_profile['sub']
    username = auth0_profile['nickname']
    email = auth0_profile['email']
    profile = Profile(sub, username, email)
    db.session.add(profile)
    db.session.commit()
    return profile


# helper to query auth0 profile data
def __get_auth0_profile(access_token):
    print('getting profile for access_token: ' + access_token)
    auth0_domain = 'https://' + os.environ.get('AUTH0_DOMAIN') + '/userinfo'
    response = requests.get(auth0_domain, headers={'Authorization': access_token})
    return response.json()


def get_profile_by_sub(sub) -> Profile:
    return Profile.query.filter_by(sub=sub).first()
