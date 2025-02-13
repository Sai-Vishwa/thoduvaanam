/*
  Warnings:

  - You are about to drop the column `boilerCode` on the `BoilerPlate` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `BoilerPlate` table. All the data in the column will be lost.
  - Added the required column `c` to the `BoilerPlate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpp` to the `BoilerPlate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `java` to the `BoilerPlate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `python` to the `BoilerPlate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoilerPlate" DROP COLUMN "boilerCode",
DROP COLUMN "language",
ADD COLUMN     "c" TEXT NOT NULL,
ADD COLUMN     "cpp" TEXT NOT NULL,
ADD COLUMN     "java" TEXT NOT NULL,
ADD COLUMN     "python" TEXT NOT NULL;
