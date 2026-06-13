import type { Request, Response } from "express";
import { requeueDLQJob } from "./dlq.service";

export async function requeueJob(req: Request, res: Response) {
  try {
    const id = req.params.id;

    await requeueDLQJob(id as string);

    return res.status(201).json({
      message: "Job requeued successfully"
    })
  } 
  catch (error) {
    return res.status(500).json({
      message: "Something went wrong, try again after a minute"
    })
  }
}