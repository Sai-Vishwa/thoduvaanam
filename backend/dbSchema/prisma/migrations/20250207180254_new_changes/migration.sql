/*
  Warnings:

  - You are about to drop the column `timeToSolve` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `leetCodeProfile` on the `Student` table. All the data in the column will be lost.
  - Added the required column `timeToSolveInHours` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "timeToSolve",
ADD COLUMN     "timeToSolveInHours" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "leetCodeProfile",
ALTER COLUMN "leetCodeName" DROP NOT NULL;
