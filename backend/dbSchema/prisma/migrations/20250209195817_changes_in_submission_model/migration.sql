/*
  Warnings:

  - You are about to drop the column `solvedOn` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `timeTaken` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `maxTimeToSolve` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "solvedOn",
DROP COLUMN "timeTaken",
ADD COLUMN     "maxTimeToSolve" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submittedOn" TIMESTAMP(3);
