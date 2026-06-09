import { prisma } from "../../database/db";
import type { CreateJobInput } from "./job.validation";

export async function createJobService(data: CreateJobInput){
  // this will do the database calls
  const job = await prisma.job.create({
    data: {
      job_type: data.jobType,
      payload: data.payload,
    }
  })

  return job;
}

export function getAllJobService(){
  // this will do the database calls
}

export function getJobByIdService(){
  // this will do the database calls
}
