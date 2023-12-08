-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_executorId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "executorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
