GET_ALL_SCOPES = '''SELECT * FROM "public"."Scope"'''

GET_SCOPE_BY_NAME = '''SELECT name FROM "public"."Scope" WHERE name = %s'''

CREATE_TABLE = '''CREATE TABLE IF NOT EXISTS "public"."Scope" (
    "name" TEXT NOT NULL UNIQUE
);'''

CREATE_SCOPE = '''INSERT INTO "public"."Scope" (name) VALUES (%s) RETURNING name'''
