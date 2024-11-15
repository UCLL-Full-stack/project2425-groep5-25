/*
  Warnings:

  - Made the column `endTime` on table `TimeBlock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TimeBlock" ALTER COLUMN "endTime" SET NOT NULL;
