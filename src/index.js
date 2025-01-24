/**
 * @file Application entry point
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import express from "express";
import config from "config";
import logger from "./utils/logger.js";
import payoutRoutes from "./routes/payoutRoutes.js";
import db from "./database/db.js";

const app = express();
const port = config.get("server.port");

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/payouts", payoutRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.listen(port, () => {
  logger.info(`ESMPPS API running on port ${port}`);
});
