GET_ALL_EMPLOYEES = '''SELECT * FROM "public"."Employee"'''

GET_EMPLOYEE_BY_ID = '''SELECT * FROM "public"."Employee" WHERE id = %s '''

CREATE_TABLE = '''CREATE TABLE IF NOT EXISTS "public"."Employee" (
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    photo TEXT NOT NULL,
    label TEXT NOT NULL,
    scopeName TEXT NOT NULL,

    CONSTRAINT "Employee_scopeName_fkey" FOREIGN KEY ("scopeName") REFERENCES "Scope"("name") ON DELETE RESTRICT ON UPDATE CASCADE
);'''

CREATE_EMPLOYEE = '''INSERT INTO "public"."Employee" ("id", "name", "photo", "label", "scopeName") VALUES (%s, %s, %s, %s, %s) RETURNING *'''

DELETE_EMPLOYEE = '''DELETE FROM "public"."Employee" WHERE id = %s'''
