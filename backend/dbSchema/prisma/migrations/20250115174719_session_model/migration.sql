/*
  Warnings:

  - You are about to drop the column `session` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "session";

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "uname" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_uname_key" ON "Session"("uname");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_uname_fkey" FOREIGN KEY ("uname") REFERENCES "Student"("uname") ON DELETE RESTRICT ON UPDATE CASCADE;
