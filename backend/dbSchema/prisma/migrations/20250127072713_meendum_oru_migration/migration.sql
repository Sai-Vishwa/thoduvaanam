/*
  Warnings:

  - Added the required column `CLangFunction` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JavsLangFunction` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PyLangFunction` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "isFinalType" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('PYTHON', 'C', 'JAVA');

-- CreateEnum
CREATE TYPE "BoilerType" AS ENUM ('READ', 'FUNCTION_CALL', 'WRITE');

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "CLangFunction" TEXT NOT NULL,
ADD COLUMN     "JavsLangFunction" TEXT NOT NULL,
ADD COLUMN     "PyLangFunction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "code" TEXT,
ADD COLUMN     "isFinal" "isFinalType" NOT NULL DEFAULT 'NO',
ADD COLUMN     "leetCodeLink" TEXT,
ADD COLUMN     "output1" TEXT,
ADD COLUMN     "output2" TEXT;

-- CreateTable
CREATE TABLE "BoilerPlate" (
    "id" SERIAL NOT NULL,
    "language" "LanguageType" NOT NULL,
    "type" "BoilerType" NOT NULL,
    "boilerCode" TEXT NOT NULL,

    CONSTRAINT "BoilerPlate_pkey" PRIMARY KEY ("id")
);
