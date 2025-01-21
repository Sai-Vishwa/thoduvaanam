/*
  Warnings:

  - Added the required column `topic` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "topic" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_topic_fkey" FOREIGN KEY ("topic") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
