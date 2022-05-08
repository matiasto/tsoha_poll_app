from json import load
import os


class FetchQuery:
    """Fetchec queries

    Fetches queries from queries.json
    with key value.

    Returns:
        query(str): target sql query
    """
    
    @staticmethod
    def get_sql_query(name: str):
        url = os.path.join(os.path.dirname(__file__), "queries.json")
        with open(url) as queries:
            data = load(queries)
            return data[name]
