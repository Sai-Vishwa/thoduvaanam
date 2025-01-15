/*
  Warnings:

  - Added the required column `lastQuestionSolved` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "lastQuestionSolved" TIMESTAMP(3) NOT NULL;
