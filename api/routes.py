from app import app
from .components.auth.SignInAPI import SignInAPI
from .components.auth.SignOutAPI import SignOutAPI
from .components.auth.SignUpAPI import SignUpAPI
from .components.poll.ProfileAPI import ProfileAPI
from .components.poll.PollAPI import PollAPI
from .components.poll.PollsAPI import PollsAPI
from flask_restful import Api
from flask import send_from_directory
from flask_jwt_extended import (
    JWTManager, create_access_token,
    get_jwt_identity, get_jwt, set_access_cookies
)
from datetime import timedelta, datetime, timezone
import json
import os

app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)



@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

api = Api(app)

api.add_resource(SignInAPI, "/api/signin")
api.add_resource(SignOutAPI, "/api/signout")
api.add_resource(SignUpAPI, "/api/signup")
api.add_resource(PollAPI, "/api/poll/<int:poll_id>")
api.add_resource(PollsAPI, "/api/polls")
api.add_resource(ProfileAPI, "/api/profile")


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/tmp")
def test():
    return {
        "status": "ok"
    }

