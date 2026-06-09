import { prisma } from "../database/db";

export async function claimJob(){
  const job = await prisma.job.findFirst({
    where: {
      status: "PENDING",
      availableAt: {
        lte: new Date()
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  if(!job){
    return null;
  }

  await prisma.job.update({
    where: {
      id: job.id
    },
    data: {
      status: "PROCESSING",
      lockedAt: new Date()
    }
  })

  return job;
} 