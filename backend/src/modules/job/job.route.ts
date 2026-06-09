import { Router } from "express";
import { createJob, getAllJob, getJobById } from "./job.controller";

export const jobRouter = Router();

// get all jobs
jobRouter.get("/jobs", (req, res) => getAllJob)

// get a job
jobRouter.get("/jobs/:id", (req, res) => getJobById )

// create a job
jobRouter.post("/jobs", (req, res) => createJob)