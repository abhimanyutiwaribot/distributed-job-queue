import type { Request, Response } from "express";
import { createJobService, getAllJobService, getJobByIdService } from "./job.service";
import { createJobSchema } from "./job.validation";

export async function createJob(req: Request, res: Response) {
  try {
    // validation here 
    const validate = createJobSchema.safeParse(req.body);

    if (!validate.success) {
      res.status(400).json({
        message: "Validation Failed",
        error: validate.error.flatten()
      });
      return;
    }

    // then go to service
    const job = await createJobService(validate.data);

    // return the res
    return res.status(201).json({
      message: "Job Created",
      data: job
    })
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export async function getAllJob(req: Request, res: Response) {
  try {
    const service = await getAllJobService()
  }
  catch(error){

  }
}

export async function getJobById(req: Request, res: Response) {
  try{
    const service = await getJobByIdService()
  }
  catch(error){

  }
}