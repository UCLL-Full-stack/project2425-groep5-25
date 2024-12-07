/*
  Warnings:

  - You are about to drop the column `workScheduleId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `WorkSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `WorkSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_workScheduleId_fkey";

-- DropIndex
DROP INDEX "User_workScheduleId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "workScheduleId";

-- AlterTable
ALTER TABLE "WorkSchedule" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkSchedule_userId_key" ON "WorkSchedule"("userId");

-- AddForeignKey
ALTER TABLE "WorkSchedule" ADD CONSTRAINT "WorkSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
