# src/__init__.py

import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_talisman import Talisman

from src.auth.auth_service import auth0_service

# instantiate db
db = SQLAlchemy()


def create_app(script_info=None):
    # instantiate app
    app = Flask(__name__)

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)
    auth0_client_origin_url = app.config['AUTH0_DOMAIN']
    auth0_domain = app.config['AUTH0_DOMAIN']
    auth0_audience = app.config['AUTH0_AUDIENCE']

    # init db
    db.init_app(app)


    # init authorization
    csp = {
        'style-src': [
            '\'unsafe-inline\'',
            '\'self\'',
        ],
        'script-src': [
            '\'unsafe-inline\'',
            '\'self\'',
        ],
        'default-src': ['\'self\''],
        'frame-ancestors': ['\'none\'']
    }
    Talisman(app,
             frame_options='DENY',
             content_security_policy=csp,
             referrer_policy='no-referrer')
    auth0_service.initialize(auth0_domain, auth0_audience)

    @app.after_request
    def add_headers(response):
        response.headers['X-XSS-Protection'] = '0'
        response.headers['Cache-Control'] = 'no-store, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
        # TODO interferes with docs ui generation
        # need to add exception for /docs routre
        #response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return response

    CORS(
        app,
        resources={r"/*": {"origins": auth0_client_origin_url}},
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET"],
        max_age=86400
    )

    from flask_restx import Api

    from src.api.profile.profile_controller import api as profile_ns
    from src.api.ping.ping_controller import api as ping_ns
    from src.api.post.post_controller import api as post_ns

    api = Api(
        title='Seshn API',
        version='0.1',
        description='Backend service for client app',
        doc='/docs'
    )

    api.add_namespace(ping_ns, path='/ping')
    api.add_namespace(profile_ns, path='/profile')
    api.add_namespace(post_ns, path='/post')

    api.init_app(app)

    # register blueprints
    '''
    from src.api.ping.ping_controller import ping_blueprint
    app.register_blueprint(ping_blueprint)
    from src.api.profile.profile_controller import profile_bp
    app.register_blueprint(profile_bp)
    from src.api.post.post_controller import post_bp
    app.register_blueprint(post_bp)
    '''

    return app
