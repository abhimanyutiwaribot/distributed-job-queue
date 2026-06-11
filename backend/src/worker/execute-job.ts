import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../database/db";
import { sendEmailHandler, type SendEmailPayload } from "../handler/sent-email.handler";

type Job = {
  id: string,
  job_type: "SEND_EMAIL",
  idem_key: string,
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
    await prisma.idempotencyKey.create({
      data: {
        jobId: job.id,
        status: 'PROCESSING',
        idemKey: job.idem_key,
      }
    })

    await jobHandler(job.payload)

    await prisma.idempotencyKey.update({
      where: {
        idemKey: job.idem_key
      },
      data: {
        status: "COMPLETED"
      }
    })

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
    if(
      error instanceof Prisma.PrismaClientKnownRequestError && 
      error.code === "P2002"
    ){
      console.log("Duplicate idempotency key");
      return;
    }

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