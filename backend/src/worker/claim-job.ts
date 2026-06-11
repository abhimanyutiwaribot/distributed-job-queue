import { prisma } from "../database/db";
import type { Job } from "../../generated/prisma/client";

export async function claimJob() {
  return prisma.$transaction(async (tx) => {

    const jobs = await tx.$queryRaw<Job[]>`
      SELECT *  
      FROM "Job"
      WHERE status = 'PENDING'
        AND "availableAt" <= NOW()
      ORDER BY "createdAt"
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    `;

    if (jobs.length === 0) {
      return null;
    }

    const job = jobs[0];

    if (!job) {
      return null;
    }

    await tx.job.update({
      where: {
        id: job.id,
      },
      data: {
        status: "PROCESSING",
        lockedAt: new Date(),
      },
    });

    return job;
  });
} 