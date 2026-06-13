import { Router } from "express";
import { getAllJobs, getJobById, requeueJob } from "./dlq.controller";

export const dlqRouter = Router();

dlqRouter.get("/", getAllJobs);
dlqRouter.get("/:id", getJobById);
dlqRouter.post("/:id/requeue", requeueJob)