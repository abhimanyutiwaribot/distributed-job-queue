-- CreateTable
CREATE TABLE "DeadLetterJob" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL,
    "error" TEXT,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeadLetterJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeadLetterJob_id_key" ON "DeadLetterJob"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DeadLetterJob_originalId_key" ON "DeadLetterJob"("originalId");
