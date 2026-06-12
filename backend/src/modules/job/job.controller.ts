import type { Request, Response } from "express";
import { createJobService, getAllJobService, getJobByIdService } from "./job.service";
import { createJobSchema } from "./job.validation";
import { IdemKeySchema } from "../../validation/validation.idemKey";

export async function createJob(req: Request, res: Response) {
  try {
    // validation here 
    const rawIdemKey = req.header("Idempotency-Key");

    if(rawIdemKey && rawIdemKey.length > 100){
      return res.status(400).json({
        message: "Invalid Idempotency-Key"
      })
    }

    let idemKey: string;

    if(rawIdemKey){
      const idemKeyValidate = IdemKeySchema.safeParse(rawIdemKey);
      
      if(!idemKeyValidate.success){
        return res.status(400).json({
          message: "Invalid Key",
          error: idemKeyValidate.error.flatten()
        });
      }

      idemKey = idemKeyValidate.data;
    }
    else{
      idemKey = crypto.randomUUID()
    }

    const validate = createJobSchema.safeParse(req.body);

    if (!validate.success) {
      res.status(400).json({
        message: "Validation Failed",
        error: validate.error.flatten()
      });
      return;
    }

    // then go to service
    const job = await createJobService(validate.data, idemKey);

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
    const jobs = await getAllJobService();
    return res.status(200).json({
      message: "Fetched All Jobs",
      data: jobs
    })
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export async function getJobById(req: Request, res: Response) {
  try {
    const job = await getJobByIdService();
    return res.status(200).json({
      message: "Fetched Job",
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