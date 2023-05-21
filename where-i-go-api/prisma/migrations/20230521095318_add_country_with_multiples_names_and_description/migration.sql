/*
  Warnings:

  - You are about to drop the column `description` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "description",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "CountryName" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "CountryName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryDescription" (
    "id" SERIAL NOT NULL,
    "countryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "CountryDescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryName_countryId_language_key" ON "CountryName"("countryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "CountryDescription_countryId_language_key" ON "CountryDescription"("countryId", "language");

-- AddForeignKey
ALTER TABLE "CountryName" ADD CONSTRAINT "CountryName_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryDescription" ADD CONSTRAINT "CountryDescription_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
