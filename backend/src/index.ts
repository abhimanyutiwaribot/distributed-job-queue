import express from "express";
import { jobRouter } from "./modules/job/job.route.ts";
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/v1", jobRouter);


app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})