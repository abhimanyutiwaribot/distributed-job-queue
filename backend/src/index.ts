import express from "express";
import cors from 'cors';
import { jobRouter } from "./modules/job/job.route.ts";
import { dlqRouter } from "./modules/dlq/dlq.route.ts";
import { metricsRouter } from "./modules/metrics/metrics.route.ts";
const app = express();

//for production
// const corsOptions = {
//   origin: ['https://frontend.com'], // Allowed domains
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Allow cookies/auth headers
//   optionsSuccessStatus: 200 // For legacy browser support
// };

app.use(cors())
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/api/v1", jobRouter);
app.use("/api/v1/dlq", dlqRouter)
app.use("/api/v1/metrics", metricsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})