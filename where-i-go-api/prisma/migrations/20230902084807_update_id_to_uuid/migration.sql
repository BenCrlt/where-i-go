/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CountryDescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CountryName` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Step` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StepDescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StepName` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CountryDescription" DROP CONSTRAINT "CountryDescription_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountryName" DROP CONSTRAINT "CountryName_countryId_fkey";

-- DropForeignKey
ALTER TABLE "StepDescription" DROP CONSTRAINT "StepDescription_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepName" DROP CONSTRAINT "StepName_stepId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Country_id_seq";

-- AlterTable
ALTER TABLE "CountryDescription" DROP CONSTRAINT "CountryDescription_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CountryDescription_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CountryDescription_id_seq";

-- AlterTable
ALTER TABLE "CountryName" DROP CONSTRAINT "CountryName_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "countryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CountryName_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CountryName_id_seq";

-- AlterTable
ALTER TABLE "Step" DROP CONSTRAINT "Step_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Step_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Step_id_seq";

-- AlterTable
ALTER TABLE "StepDescription" DROP CONSTRAINT "StepDescription_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "stepId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StepDescription_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StepDescription_id_seq";

-- AlterTable
ALTER TABLE "StepName" DROP CONSTRAINT "StepName_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "stepId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StepName_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StepName_id_seq";

-- AddForeignKey
ALTER TABLE "CountryName" ADD CONSTRAINT "CountryName_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryDescription" ADD CONSTRAINT "CountryDescription_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepName" ADD CONSTRAINT "StepName_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepDescription" ADD CONSTRAINT "StepDescription_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
