from app import create_connection
from psycopg2.extras import RealDictCursor
from . import scope, staff, tasks


def create_tables():
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(scope.CREATE_TABLE)
            cursor.execute(staff.CREATE_TABLE)
            cursor.execute(tasks.CREATE_TABLE)
