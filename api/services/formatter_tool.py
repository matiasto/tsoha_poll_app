import json
import datetime


class FormatterTool:
    @staticmethod
    def to_json(columns, data, to_json=False):
        def defaultconverter(o):
            if isinstance(o, datetime.datetime):
                return o.__str__()
        result = list()
        for row in data:
            result.append(dict(zip(columns, row)))
        if to_json:
            return json.dumps(result, default=defaultconverter)
        return result
