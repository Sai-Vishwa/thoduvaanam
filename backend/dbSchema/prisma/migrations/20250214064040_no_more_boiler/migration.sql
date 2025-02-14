/*
  Warnings:

  - You are about to drop the `BoilerPlate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoilerPlate" DROP CONSTRAINT "BoilerPlate_questionId_fkey";

-- DropTable
DROP TABLE "BoilerPlate";
