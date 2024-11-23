-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "createdDate" DROP NOT NULL,
ALTER COLUMN "updatedDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TimeBlock" ALTER COLUMN "createdDate" DROP NOT NULL,
ALTER COLUMN "updatedDate" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdDate" DROP NOT NULL,
ALTER COLUMN "updatedDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkSchedule" ALTER COLUMN "createdDate" DROP NOT NULL,
ALTER COLUMN "updatedDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workday" ALTER COLUMN "createdDate" DROP NOT NULL,
ALTER COLUMN "updatedDate" DROP NOT NULL;
