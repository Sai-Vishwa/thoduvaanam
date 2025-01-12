-- CreateEnum
CREATE TYPE "OTPStatus" AS ENUM ('PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "leetCodeProfile" TEXT;

-- CreateTable
CREATE TABLE "OTPStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rno" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "leetCodeName" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "leetCodeProfile" TEXT,
    "otp" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "status" "OTPStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "OTPStudent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTPStudent_rno_key" ON "OTPStudent"("rno");

-- CreateIndex
CREATE UNIQUE INDEX "OTPStudent_uname_key" ON "OTPStudent"("uname");
