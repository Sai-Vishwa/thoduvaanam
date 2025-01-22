/*
  Warnings:

  - Added the required column `timeOfComment` to the `Discussions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfLastSolve` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discussions" ADD COLUMN     "timeOfComment" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "timeOfLastSolve" TIMESTAMP(3) NOT NULL;
