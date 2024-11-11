/*
  Warnings:

  - Made the column `createdDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `TimeBlock` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `TimeBlock` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `WorkSchedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `WorkSchedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `Workday` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `Workday` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "TimeBlock" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkSchedule" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workday" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;
