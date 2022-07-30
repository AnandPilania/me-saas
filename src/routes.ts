import express from "express";
import { authRoutes } from "./modules/auth";
import { userRoutes } from "./modules/user";
import { apiVersion } from "./utils/const";

const router = express.Router();

// Health check
router.get("/health", (_, res) => res.status(200).send("OK"));

// Module apis
router.use(`${apiVersion}/auth`, authRoutes);
router.use(`${apiVersion}/user`, userRoutes);

// Catch all unmatched routes
router.all("*", (_, res) => res.status(404).send("Route not found"));

export default router;
