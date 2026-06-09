-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('SEND_EMAIL');

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "idem_key" TEXT,
    "payload" JSONB NOT NULL,
    "status" "JobStatus" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_id_key" ON "Jobs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Jobs_idem_key_key" ON "Jobs"("idem_key");
