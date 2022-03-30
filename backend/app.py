from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api.CreateApiHandler import CreateApiHandler

app = Flask(__name__, static_folder='frontend/build')
CORS(app)
api = Api(app)

api.add_resource(CreateApiHandler, '/poll/create')