from flask import Flask

app = Flask(__name__)

from flask_restful import Api
from flask_cors import CORS
from api.PollsApi import PollsApi
from api.PollApi import PollApi

CORS(app)
api = Api(app)

api.add_resource(PollApi, "/api/poll/<poll_id>")
api.add_resource(PollsApi, "/api/polls")