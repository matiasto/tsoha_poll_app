from json import load
import os


class FetchQuery:
    @staticmethod
    def get_sql_query(name: str):
        url = os.path.join(os.path.dirname(__file__), "queries.json")
        with open(url) as queries:
            data = load(queries)
            return data[name]
