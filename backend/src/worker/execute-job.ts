import { prisma } from "../database/db";
import { sendEmailHandler } from "../handler/sent-email.handler";

type Job = {
  id: string,
  job_type: "SEND_EMAIL",
  payload: unknown
}

const handlers = {
  SEND_EMAIL: sendEmailHandler
}

export async function executeJob(job: Job) {
  
  console.log("Processing: " + job.id);

  const jobHandler = handlers[job.job_type]

  if (!jobHandler) {
    throw new Error(
      `No handler found for ${job.job_type}`
    )
  }
  try {
    await jobHandler(job.payload)

    await prisma.job.update({
      where: {
        id: job.id
      },
      data: {
        status: "COMPLETED"
      }
    })
  }
  catch (error) {
    await prisma.job.update({
      where: {
        id: job.id
      },
      data: {
        status: "FAILED"
      }
    })

    throw error;
  }
}