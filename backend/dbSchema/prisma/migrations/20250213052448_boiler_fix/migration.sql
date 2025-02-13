/*
  Warnings:

  - The values [READ,FUNCTION_CALL,WRITE] on the enum `BoilerType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `CLangFunction` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `CppLangFunction` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `JavaLangFunction` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `PyLangFunction` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BoilerType_new" AS ENUM ('TO_USER', 'MAIN');
ALTER TABLE "BoilerPlate" ALTER COLUMN "type" TYPE "BoilerType_new" USING ("type"::text::"BoilerType_new");
ALTER TYPE "BoilerType" RENAME TO "BoilerType_old";
ALTER TYPE "BoilerType_new" RENAME TO "BoilerType";
DROP TYPE "BoilerType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "CLangFunction",
DROP COLUMN "CppLangFunction",
DROP COLUMN "JavaLangFunction",
DROP COLUMN "PyLangFunction";
