from app import app, create_connection
from app.queries import tasks as queries
from app.queries import scope as scope_queries
from psycopg2.extras import RealDictCursor
from flask import request, Response


@app.get("/api/tasks")
def get_tasks():
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_ALL_TASKS)
            tasks = cursor.fetchall()
    return tasks


@app.post("/api/tasks")
def create_task():
    data = request.get_json()
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(scope_queries.GET_SCOPE_BY_NAME, (data["scopeName"],))
            scope_name = cursor.fetchone()

            if not scope_name:
                cursor.execute(scope_queries.CREATE_SCOPE, (data["scopeName"],))
                scope_name = cursor.fetchone()
            
            args = (data["title"], data["description"], data["value"], data.get("status", "open"), data["scopeName"], data["deadline"])
            cursor.execute(queries.CREATE_TASK, args)
            created = cursor.fetchone()

    return created, 201


@app.delete("/api/tasks/<id>")
def delete_task(id):
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_TASK_BY_ID, (id, ))
            task = cursor.fetchone()

            if not task:
                return "Task with provided id doesn't exist", 404
            
            cursor.execute(queries.DELETE_TASK, (id, ))

    return Response(status=204)


@app.patch("/api/tasks/<id>")
def update_task(id):
    data = request.get_json()
    with create_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(queries.GET_TASK_BY_ID, (id, ))
            task = cursor.fetchone()

            if not task:
                return "Task with provided id doesn't exist", 404

            args = (data["executorId"], data["status"], id)
            cursor.execute(queries.ASSIGN_EXECUTOR_TO_TASK, args)
            updated = cursor.fetchone()

    return updated
