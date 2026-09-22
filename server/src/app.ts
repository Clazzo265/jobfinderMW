import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "JobFinder MW API is running 🇲🇼",
  });
});

app.use("/api/jobs", jobRoutes);

export default app;