GET_ALL_TASKS = '''SELECT * FROM "public"."Task"'''

GET_TASK_BY_ID = '''SELECT * FROM "public"."Task" WHERE id = %s'''

CREATE_STATUS_ENUM = '''CREATE TYPE "TaskStatus" AS ENUM ('open', 'inProgress', 'closed')'''

CREATE_TABLE = '''CREATE TABLE IF NOT EXISTS "public"."Task" (
    id SERIAL NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    value INTEGER NOT NULL,
    status "TaskStatus"  NOT NULL DEFAULT "open",
    scopeName TEXT NOT NULL,
    deadline TIMESTAMP(3) NOT NULL,
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
    employeeId TEXT,
    
    CONSTRAINT "Task_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    CONSTRAINT "Task_scopeName_fkey" FOREIGN KEY ("scopeName") REFERENCES "Scope"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
);
'''

CREATE_TASK = '''INSERT INTO "public"."Task" ("title","description","value","status","scopeName","deadline") VALUES (%s,%s,%s,CAST(%s::text AS "public"."TaskStatus"),%s,%s) RETURNING *'''

DELETE_TASK = '''DELETE FROM "public"."Task" WHERE id = %s'''

ASSIGN_EXECUTOR_TO_TASK = '''UPDATE "public"."Task" SET "executorId" = %s, "status" = CAST(%s::text AS "public"."TaskStatus") WHERE id = %s RETURNING *'''
