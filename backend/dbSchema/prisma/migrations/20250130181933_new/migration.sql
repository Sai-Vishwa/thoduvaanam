/*
  Warnings:

  - The values [ACCEPTED,REJECTED] on the enum `AcceptedType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[leetCodeName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionId` to the `BoilerPlate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeToSolve` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AcceptedType_new" AS ENUM ('PENDING', 'COMPLETED', 'STARTED');
ALTER TABLE "Submission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Submission" ALTER COLUMN "status" TYPE "AcceptedType_new" USING ("status"::text::"AcceptedType_new");
ALTER TYPE "AcceptedType" RENAME TO "AcceptedType_old";
ALTER TYPE "AcceptedType_new" RENAME TO "AcceptedType";
DROP TYPE "AcceptedType_old";
ALTER TABLE "Submission" ALTER COLUMN "status" SET DEFAULT 'STARTED';
COMMIT;

-- AlterTable
ALTER TABLE "BoilerPlate" ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "timeToSolve" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "language" "LanguageType",
ADD COLUMN     "timeTaken" TIMESTAMP(3),
ALTER COLUMN "solvedOn" DROP NOT NULL,
ALTER COLUMN "solvedOn" DROP DEFAULT,
ALTER COLUMN "status" SET DEFAULT 'STARTED',
ALTER COLUMN "noOfCasesPassed" SET DEFAULT 0,
ALTER COLUMN "pointsSecured" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "type" "TestCaseType" NOT NULL DEFAULT 'OPEN';

-- CreateIndex
CREATE UNIQUE INDEX "Student_leetCodeName_key" ON "Student"("leetCodeName");

-- AddForeignKey
ALTER TABLE "BoilerPlate" ADD CONSTRAINT "BoilerPlate_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
