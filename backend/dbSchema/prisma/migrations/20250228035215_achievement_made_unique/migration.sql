/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Achievements` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Questions_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_title_key" ON "Achievements"("title");
