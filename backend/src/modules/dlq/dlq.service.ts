import { prisma } from "../../database/db";

export async function requeueDLQJob(dlqId: string){
  try{
    const dlqJob = await prisma.deadLetterJob.findUnique({
      where: {
        id: dlqId
      }
    })

    if(!dlqJob){
      throw new Error("DLQ job not found");
    }

    await prisma.$transaction(async (tx) => {
      await tx.job.update({
        where: {
          id: dlqJob.originalId
        },
        data: {
          status: 'PENDING',
          attempts: 0,
          lockedAt: null,
          availableAt: new Date()
        }
      });

      await tx.idempotencyKey.update({
        where: {
          idemKey: dlqJob.idemKey
        },
        data: {
          status: 'PENDING'
        }
      })

      await tx.deadLetterJob.delete({
        where: {
          id: dlqId
        }
      })
    })

  }
  catch(error){
    return error
  }
}

export async function getAllDLQJob(skip: number, take: number) {
  const [jobs, total] = await Promise.all([
    prisma.deadLetterJob.findMany({
      skip,
      take,
      orderBy: {
        failedAt: "desc"
      }
    }),
    prisma.deadLetterJob.count()
  ]);

  return { jobs, total };
}

export function getDLQJobById(id: string) {
  return prisma.deadLetterJob.findUnique({
    where: {
      id
    }
  });
}