import express from "express";

const router = express.Router();

router.get("/health", (_, res) => res.status(200).send("Auth router OK"));

export default router;
