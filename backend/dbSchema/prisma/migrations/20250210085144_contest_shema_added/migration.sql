/*
  Warnings:

  - You are about to drop the column `timeToSolveInHours` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `timeToSolveInMinutes` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "timeToSolveInHours",
ADD COLUMN     "contestId" INTEGER,
ADD COLUMN     "timeToSolveInMinutes" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Contest" (
    "id" SERIAL NOT NULL,
    "opensOn" TIMESTAMP(3) NOT NULL,
    "closesOn" TIMESTAMP(3) NOT NULL,
    "timeToSolveInMinutes" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "totalNoOfQuestions" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contest_topicId_key" ON "Contest"("topicId");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contest" ADD CONSTRAINT "Contest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
