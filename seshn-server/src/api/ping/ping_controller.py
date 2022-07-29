# ping_controller.py


from flask import Blueprint
from flask_restx import Resource, Api, Namespace

api = Namespace('ping', description="Sanity check endpoint")


@api.route('/')
class Ping(Resource):

    def get(self):
        return {
            'status': 'success',
            'message': 'pong!'
        }
