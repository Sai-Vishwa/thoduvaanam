/*
  Warnings:

  - You are about to drop the column `maxCriteria` on the `Achievements` table. All the data in the column will be lost.
  - You are about to drop the column `minCriteria` on the `Achievements` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Achievements` table. All the data in the column will be lost.
  - You are about to drop the column `currStreak` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastQuestionSolved` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `maxStreak` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `acquiredOn` on the `StudentAchievements` table. All the data in the column will be lost.
  - Added the required column `count` to the `StudentAchievements` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('GENERAL', 'SPECIFIC');

-- AlterEnum
ALTER TYPE "AcceptedType" ADD VALUE 'PENDING';

-- DropIndex
DROP INDEX "Student_points_idx";

-- AlterTable
ALTER TABLE "Achievements" DROP COLUMN "maxCriteria",
DROP COLUMN "minCriteria",
DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "leetCodeTitle" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "currStreak",
DROP COLUMN "lastLogin",
DROP COLUMN "lastQuestionSolved",
DROP COLUMN "maxStreak",
DROP COLUMN "points";

-- AlterTable
ALTER TABLE "StudentAchievements" DROP COLUMN "acquiredOn",
ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "AchievementType";

-- CreateTable
CREATE TABLE "Discussions" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" "CommentType" NOT NULL DEFAULT 'GENERAL',
    "questionId" INTEGER,
    "repliedTo" INTEGER,

    CONSTRAINT "Discussions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentAchievements_count_idx" ON "StudentAchievements"("count");

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussions" ADD CONSTRAINT "Discussions_repliedTo_fkey" FOREIGN KEY ("repliedTo") REFERENCES "Discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
