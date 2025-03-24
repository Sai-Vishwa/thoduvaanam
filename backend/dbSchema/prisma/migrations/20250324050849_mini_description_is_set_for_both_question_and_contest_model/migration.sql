/*
  Warnings:

  - Made the column `description` on table `Questions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "miniDescription" TEXT;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "miniDescription" TEXT,
ALTER COLUMN "description" SET NOT NULL;
