import json
import datetime

class FormatterTool:
    @staticmethod
    def to_json(columns, data):
        def defaultconverter(o):
            if isinstance(o, datetime.datetime):
                return o.__str__()
        result = list()
        for row in data:
            result.append(dict(zip(columns, row)))
        return json.dumps(result, default=defaultconverter)