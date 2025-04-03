-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "failedForInput" TEXT,
ADD COLUMN     "isChecked" "isFinalType" NOT NULL DEFAULT 'NO';
