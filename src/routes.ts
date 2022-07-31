import express from "express";
import { authRoutes } from "./modules/auth";
import { userRoutes } from "./modules/user";
import { apiVersion } from "./utils/consts";

const router = express.Router();

router.get("/", (_, res) => res.status(200).send(`Express SaaS app. API version V1.`));

// Health check
router.get("/health", (_, res) => res.status(200).send("OK"));

// Test global error handling
router.get("/error", (_, res) => {
	throw new Error("Raise some error.");

	res.status(200).send(`API version ${apiVersion}`);
});

// Module apis
router.use(`${apiVersion}/auth`, authRoutes);
router.use(`${apiVersion}/users`, userRoutes);

// Catch all unmatched routes
router.all("*", (_, res) => res.status(404).send("Route not found"));

export default router;
