-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "savedCCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "savedCppCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "savedJavaCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "savedPythonCode" TEXT NOT NULL DEFAULT 'Hi';
