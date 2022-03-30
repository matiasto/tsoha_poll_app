from flask import request
from flask_restful import Resource


class CreateApiHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Hello World"
        }
    def post(self):
        package = request.json['body']
        for i in package['poll']:
            print(i)
        print(package['meta']['poll_title'])
        print(package['meta']['poll_description'])
        print(package['meta']['credits_per_voter'])

