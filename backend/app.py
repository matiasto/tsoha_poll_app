from flask import Flask

app = Flask(__name__)

from flask_restful import Api
from flask_cors import CORS
from api.CreateApiHandler import CreateApiHandler

CORS(app)
api = Api(app)

api.add_resource(CreateApiHandler, '/poll/create')