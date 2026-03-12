import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import { runMigrations } from "./db/migrate";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:8080",
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/auth", limiter);

// Parsing
app.use(express.json({ limit: "10mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start
async function start() {
  try {
    await runMigrations();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}

start();
