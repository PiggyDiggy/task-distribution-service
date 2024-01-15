from app import app, create_connection
from app.queries import staff as queries
from app.queries import scope as scope_queries
from psycopg2.extras import RealDictCursor
from flask import request, Response
from uuid import uuid4


@app.get("/api/staff")
def get_employees():
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_ALL_EMPLOYEES)
            employees = cursor.fetchall()

    return employees


@app.post("/api/staff")
def create_employee():
    data = request.get_json()
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(scope_queries.GET_SCOPE_BY_NAME, (data["scopeName"],))
            scope_name = cursor.fetchone()

            if not scope_name:
                cursor.execute(scope_queries.CREATE_SCOPE, (data["scopeName"],))
                scope_name = cursor.fetchone()
            
            args = (str(uuid4()), data["name"], data["photo"], data["label"], scope_name["name"])
            cursor.execute(queries.CREATE_EMPLOYEE, args)
            created = cursor.fetchone()

    return created, 201


@app.delete("/api/staff/<id>")
def delete_employee(id):
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_EMPLOYEE_BY_ID, (id, ))
            employee = cursor.fetchone()

            if not employee:
                return "Employee with provided id doesn't exist", 404
            
            cursor.execute(queries.DELETE_EMPLOYEE, (id, ))

    return Response(status=204)
