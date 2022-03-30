from flask import request
from flask_restful import Resource
from backend.db import db


class CreateApiHandler(Resource):
    def post(self):
        package = request.json['body']
        for i in package['poll']:
            print(i)
        print(package['meta']['poll_title'])
        print(package['meta']['poll_description'])
        print(package['meta']['credits_per_voter'])
        

