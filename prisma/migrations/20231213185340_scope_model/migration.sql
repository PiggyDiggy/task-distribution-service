/*
  Warnings:

  - You are about to drop the column `scope` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Task` table. All the data in the column will be lost.
  - Added the required column `scopeName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scopeName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "scope",
ADD COLUMN     "scopeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "scope",
ADD COLUMN     "scopeName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Scope";

-- CreateTable
CREATE TABLE "Scope" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "Scope"("name");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_scopeName_fkey" FOREIGN KEY ("scopeName") REFERENCES "Scope"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_scopeName_fkey" FOREIGN KEY ("scopeName") REFERENCES "Scope"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
