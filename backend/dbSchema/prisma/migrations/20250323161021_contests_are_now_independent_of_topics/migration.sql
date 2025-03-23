/*
  Warnings:

  - You are about to drop the column `topicId` on the `Contest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_topicId_fkey";

-- DropIndex
DROP INDEX "Contest_topicId_key";

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "topicId";
