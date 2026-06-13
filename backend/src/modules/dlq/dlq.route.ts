import { Router } from "express";
import { requeueJob } from "./dlq.controller";

export const dlqRouter = Router();

dlqRouter.post("/:id/requeue", requeueJob)