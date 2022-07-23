# ping_controller.py


from flask import Blueprint
from flask_restx import Resource, Api


ping_blueprint = Blueprint('ping', __name__)
ping_api = Api(ping_blueprint)


class Ping(Resource):

    def get(self):
        return {
            'status': 'success',
            'message': 'pong!'
        }


ping_api.add_resource(Ping, '/ping')
