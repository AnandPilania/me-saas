import express from "express";
import { validateResource } from "../../middlewares";
import { createNewUser } from "./user.controllers";
import { createUserSchema } from "./user.schema";

const router = express.Router();

router.get("/health", (_, res) => res.status(200).send("User router OK"));

router.post("/", [validateResource(createUserSchema)], createNewUser);

export default router;
