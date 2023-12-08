/*
  Warnings:

  - Changed the type of `scope` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `scope` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('open', 'inProgress', 'closed');

-- CreateEnum
CREATE TYPE "Scope" AS ENUM ('design', 'frontend', 'backend', 'mobile', 'analytics', 'testing', 'managing', 'other');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "scope",
ADD COLUMN     "scope" "Scope" NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "scope" "Scope" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL;
