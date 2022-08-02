import express from "express";
import passport from "passport";
import { protectedRoute, authenticateUser } from "./auth.controllers";

const router = express.Router();

router.get("/health", (_, res) => res.status(200).send("Auth router OK"));

router.get("/protected", [passport.authenticate("jwt", { session: false })], protectedRoute);

router.post("/login", authenticateUser);

export default router;
