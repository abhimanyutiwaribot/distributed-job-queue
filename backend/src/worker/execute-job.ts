import { prisma } from "../database/db";
import { sendEmailHandler, type SendEmailPayload } from "../handler/sent-email.handler";

type Job = {
  id: string,
  job_type: "SEND_EMAIL",
  payload: SendEmailPayload,
  attempts: number,
  availableAt: Date
}

const handlers = {
  SEND_EMAIL: sendEmailHandler
}

const MAX_RETRIES = 3;

export async function executeJob(job: Job) {

  console.log(process.pid + " Processing: " + job.id);

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
    const updateAttempts = job.attempts + 1;    
    await prisma.job.update({
      where: {
        id: job.id
      },
      data: {
        status: updateAttempts >= MAX_RETRIES ? "FAILED" : "PENDING",
        attempts: updateAttempts,
        availableAt: new Date(Date.now() + 5000)
      }
    })

    console.error(`Job ${job.id} failed : ${error}`)
  }
}