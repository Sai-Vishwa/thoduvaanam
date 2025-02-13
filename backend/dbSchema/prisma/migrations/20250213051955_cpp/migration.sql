/*
  Warnings:

  - You are about to drop the column `JavsLangFunction` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the `ContestResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CppLangFunction` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JavaLangFunction` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "LanguageType" ADD VALUE 'CPP';

-- DropForeignKey
ALTER TABLE "ContestResult" DROP CONSTRAINT "ContestResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "ContestResult" DROP CONSTRAINT "ContestResult_topicId_fkey";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "JavsLangFunction",
ADD COLUMN     "CppLangFunction" TEXT NOT NULL,
ADD COLUMN     "JavaLangFunction" TEXT NOT NULL;

-- DropTable
DROP TABLE "ContestResult";
