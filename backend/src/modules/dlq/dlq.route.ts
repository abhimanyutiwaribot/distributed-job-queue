import { Router } from "express";
import { getAllJobs, getJobById, requeueJob } from "./dlq.controller";
import { requeueLimiter } from "../../middleware/rate-limiter";

export const dlqRouter = Router();

dlqRouter.get("/", getAllJobs);
dlqRouter.get("/:id", getJobById);
dlqRouter.post("/:id/requeue", requeueLimiter, requeueJob)