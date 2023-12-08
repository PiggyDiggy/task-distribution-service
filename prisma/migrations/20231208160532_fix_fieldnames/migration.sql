/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `executorId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_employeeId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "employeeId",
ADD COLUMN     "executorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
