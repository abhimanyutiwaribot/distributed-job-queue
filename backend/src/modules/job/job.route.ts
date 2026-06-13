import { Router } from "express";
import { createJob, getAllJob, getJobById } from "./job.controller";
import { createJobLimiter } from "../../middleware/rate-limiter";


export const jobRouter = Router();

// get all jobs
jobRouter.get("/jobs", getAllJob)

// get a job
jobRouter.get("/jobs/:id", getJobById)

// create a job
jobRouter.post("/jobs", createJobLimiter, createJob)