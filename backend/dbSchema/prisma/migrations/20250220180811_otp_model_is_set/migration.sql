/*
  Warnings:

  - You are about to drop the column `leetCodeName` on the `OTPStudent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OTPStudent" DROP COLUMN "leetCodeName";

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "timeToSolveInMinutes" DROP NOT NULL;
