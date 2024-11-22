-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'FR');

-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('CITY');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryName" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "CountryName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryDescription" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "CountryDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "type" "StepType" NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepName" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "StepName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepDescription" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "StepDescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryName_countryId_language_key" ON "CountryName"("countryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "CountryDescription_countryId_language_key" ON "CountryDescription"("countryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StepName_stepId_language_key" ON "StepName"("stepId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StepDescription_stepId_language_key" ON "StepDescription"("stepId", "language");

-- AddForeignKey
ALTER TABLE "CountryName" ADD CONSTRAINT "CountryName_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryDescription" ADD CONSTRAINT "CountryDescription_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepName" ADD CONSTRAINT "StepName_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepDescription" ADD CONSTRAINT "StepDescription_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
