import express from "express";
import { jobRouter } from "./routes/job.route";
const app = express();

const PORT = process.env.PORT || 8080;

app.use("/api/v1", jobRouter)
