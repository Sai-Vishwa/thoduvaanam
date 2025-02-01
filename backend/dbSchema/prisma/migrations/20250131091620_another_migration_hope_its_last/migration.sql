/*
  Warnings:

  - The values [PENDING,STARTED] on the enum `AcceptedType` will be removed. If these variants are still used in the database, this will fail.
  - The values [OPEN] on the enum `TestCaseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcceptedType_new" AS ENUM ('COMPUTING', 'COMPLETED', 'WAITING');
ALTER TABLE "Submission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Submission" ALTER COLUMN "status" TYPE "AcceptedType_new" USING ("status"::text::"AcceptedType_new");
ALTER TYPE "AcceptedType" RENAME TO "AcceptedType_old";
ALTER TYPE "AcceptedType_new" RENAME TO "AcceptedType";
DROP TYPE "AcceptedType_old";
ALTER TABLE "Submission" ALTER COLUMN "status" SET DEFAULT 'WAITING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TestCaseType_new" AS ENUM ('OPEN1', 'OPEN2', 'HIDDEN');
ALTER TABLE "TestCase" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "TestCase" ALTER COLUMN "type" TYPE "TestCaseType_new" USING ("type"::text::"TestCaseType_new");
ALTER TYPE "TestCaseType" RENAME TO "TestCaseType_old";
ALTER TYPE "TestCaseType_new" RENAME TO "TestCaseType";
DROP TYPE "TestCaseType_old";
ALTER TABLE "TestCase" ALTER COLUMN "type" SET DEFAULT 'OPEN1';
COMMIT;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "status" SET DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "TestCase" ALTER COLUMN "type" SET DEFAULT 'OPEN1';
