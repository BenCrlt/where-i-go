-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('CITY');

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "type" "StepType" NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepName" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "StepName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepDescription" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "StepDescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepName_stepId_language_key" ON "StepName"("stepId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StepDescription_stepId_language_key" ON "StepDescription"("stepId", "language");

-- AddForeignKey
ALTER TABLE "StepName" ADD CONSTRAINT "StepName_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepDescription" ADD CONSTRAINT "StepDescription_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
