# src/config.py

import os

class BaseConfig:
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False



class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    AUTH0_CLIENT_ORIGIN_URL = os.environ.get('AUTH0_CLIENT_ORIGIN_URL')
    AUTH0_DOMAIN = os.environ.get('AUTH0_DOMAIN')
    AUTH0_AUDIENCE = os.environ.get('AUTH0_AUDIENCE')


class TestingConfig(BaseConfig):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_TEST_URL')


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
