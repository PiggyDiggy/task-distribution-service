from app import app, create_connection
from app.queries import scope as queries
from psycopg2.extras import RealDictCursor


@app.get("/api/scope")
def get_scopes():
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_ALL_SCOPES)
            scopes = cursor.fetchall()
    return scopes
