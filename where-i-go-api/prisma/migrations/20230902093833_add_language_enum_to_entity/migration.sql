/*
  Warnings:

  - Changed the type of `language` on the `CountryDescription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `CountryName` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `StepDescription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `language` on the `StepName` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CountryDescription" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "CountryName" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "StepDescription" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "StepName" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CountryDescription_countryId_language_key" ON "CountryDescription"("countryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "CountryName_countryId_language_key" ON "CountryName"("countryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StepDescription_stepId_language_key" ON "StepDescription"("stepId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StepName_stepId_language_key" ON "StepName"("stepId", "language");
