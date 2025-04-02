-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "CBoilerCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "CppBoilerCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "JavaBoilerCode" TEXT NOT NULL DEFAULT 'Hi',
ADD COLUMN     "PythonBoilerCode" TEXT NOT NULL DEFAULT 'Hi';
