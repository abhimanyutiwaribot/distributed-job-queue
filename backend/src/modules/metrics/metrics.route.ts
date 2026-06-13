import { Router } from "express";
import {
  handleJobMetrics,
  handleJobTypeMetrics,
  handleAverageAttempts,
  handleIdempotencyMetrics,
  handleDLQMetrics,
  handleAllMetrics
} from "./metrics.controller";

export const metricsRouter = Router();

// Get all metrics
metricsRouter.get("/", handleAllMetrics);

// Get job metrics
metricsRouter.get("/jobs", handleJobMetrics);

// Get job type metrics
metricsRouter.get("/job-types", handleJobTypeMetrics);

// Get average attempts
metricsRouter.get("/attempts", handleAverageAttempts);

// Get idempotency metrics
metricsRouter.get("/idempotency", handleIdempotencyMetrics);

// Get DLQ metrics
metricsRouter.get("/dlq", handleDLQMetrics);
