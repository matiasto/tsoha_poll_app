from json import load

class FetchQuery:
    @staticmethod
    def get_sql_query(name: str):
        with open("queries.json") as queries:
            data = load(queries)
            return data[name]