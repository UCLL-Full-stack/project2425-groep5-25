-- CreateTable
CREATE TABLE "Workday" (
    "id" SERIAL NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "expectedHours" DOUBLE PRECISION NOT NULL,
    "achievedHours" DOUBLE PRECISION,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Workday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeBlock" (
    "id" SERIAL NOT NULL,
    "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3),
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "projectId" INTEGER NOT NULL,
    "workDayId" INTEGER NOT NULL,

    CONSTRAINT "TimeBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workday_userId_key" ON "Workday"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeBlock_projectId_key" ON "TimeBlock"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeBlock_workDayId_key" ON "TimeBlock"("workDayId");

-- AddForeignKey
ALTER TABLE "Workday" ADD CONSTRAINT "Workday_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBlock" ADD CONSTRAINT "TimeBlock_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeBlock" ADD CONSTRAINT "TimeBlock_workDayId_fkey" FOREIGN KEY ("workDayId") REFERENCES "Workday"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
