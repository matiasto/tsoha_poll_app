from flask_restful import Resource


class CreateApiHandler(Resource):
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Hello World"
        }

