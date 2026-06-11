import { prisma } from "../../database/db";
import type { CreateJobInput } from "./job.validation";
import { Prisma } from "../../../generated/prisma/client";

export async function createJobService(data: CreateJobInput, idemKey: string){
  // this will do the database calls
  try{
    const job = await prisma.job.create({
      data: {
        job_type: data.jobType,
        payload: data.payload,
        idem_key: idemKey
      }
    })
  
    return job;
  }catch(error){
    if(
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002" 
    ){
      return await prisma.job.findUnique({
        where: {
          idem_key: idemKey
        }
      })
    }

    throw error;
  }
}

export function getAllJobService(){
  // this will do the database calls
}

export function getJobByIdService(){
  // this will do the database calls
}
