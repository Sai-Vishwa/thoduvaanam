-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "output1Status" "isFinalType" NOT NULL DEFAULT 'NO',
ADD COLUMN     "output2Status" "isFinalType" NOT NULL DEFAULT 'NO';
