import type { Request, Response } from "express";
import { requeueDLQJob, getAllDLQJob, getDLQJobById } from "./dlq.service";

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

export async function getAllJobs(req: Request, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;

    const { jobs, total } = await getAllDLQJob(skip, limit);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      message: "Fetched All DLQ Jobs",
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
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
    const id = req.params.id;
    
    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid or missing job ID"
      });
    }

    const job = await getDLQJobById(id);

    if (!job) {
      return res.status(404).json({
        message: "DLQ job not found"
      });
    }

    return res.status(200).json({
      message: "Fetched DLQ Job",
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