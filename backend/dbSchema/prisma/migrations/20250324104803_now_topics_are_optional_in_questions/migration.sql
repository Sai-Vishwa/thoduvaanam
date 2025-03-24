-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_topic_fkey";

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "topic" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_topic_fkey" FOREIGN KEY ("topic") REFERENCES "Topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
