from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder="client/build", static_url_path="/")

from flask_restful import Api
from api.PollsApi import PollsApi
from api.PollApi import PollApi

api = Api(app)

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

api.add_resource(PollApi, "/api/poll/<int:poll_id>")
api.add_resource(PollsApi, "/api/polls")