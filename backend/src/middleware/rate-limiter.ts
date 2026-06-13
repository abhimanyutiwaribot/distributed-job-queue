import rateLimit from "express-rate-limit";

export const createJobLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 30, 
  message: "Rate Limit exceeded"
});

export const requeueLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 20, 
  message: "Rate Limit exceeded"
});