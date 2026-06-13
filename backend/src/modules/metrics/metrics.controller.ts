import type { Request, Response } from "express";
import {
  getJobMetrics,
  getJobTypeMetrics,
  getAverageAttempts,
  getIdempotencyMetrics,
  getDLQMetrics,
  getAllMetrics
} from "./metrics.service";

export async function handleJobMetrics(req: Request, res: Response) {
  try {
    const metrics = await getJobMetrics();
    return res.status(200).json({
      message: "Job metrics retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function handleJobTypeMetrics(req: Request, res: Response) {
  try {
    const metrics = await getJobTypeMetrics();
    return res.status(200).json({
      message: "Job type metrics retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function handleAverageAttempts(req: Request, res: Response) {
  try {
    const metrics = await getAverageAttempts();
    return res.status(200).json({
      message: "Average attempts retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function handleIdempotencyMetrics(req: Request, res: Response) {
  try {
    const metrics = await getIdempotencyMetrics();
    return res.status(200).json({
      message: "Idempotency metrics retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function handleDLQMetrics(req: Request, res: Response) {
  try {
    const metrics = await getDLQMetrics();
    return res.status(200).json({
      message: "DLQ metrics retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function handleAllMetrics(req: Request, res: Response) {
  try {
    const metrics = await getAllMetrics();
    return res.status(200).json({
      message: "All metrics retrieved successfully",
      data: metrics
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
