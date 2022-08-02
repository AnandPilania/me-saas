import { Request, Response, NextFunction } from "express";
import { authServices, authSchemas } from "./";
import { userServices } from "../user";
import { log } from "../../providers";

export async function protectedRoute(req: Request, res: Response): Promise<void> {
	res.status(200).send("Protected route");
}

export async function authenticateUser(
	req: Request<{}, {}, authSchemas.LoginDto>,
	res: Response,
	next: NextFunction,
): Promise<boolean> {
	log.info("[controller] authenticateUser");

	const body = req.body;

	// Find user by username
	const user = await userServices.findUserByUsername(body.username);

	if (!user) {
		log.error("[error] user not found");
		res.status(404).send("User not found.");
		return false;
	}

	// Verify password
	const isValid = await userServices.verifyUserPassword(user.password, body.password);

	if (!isValid) {
		log.error("[error] Invalid username or password");
		res.status(401).send("Invalid username or password.");
		return false;
	}

	const result = authServices.getToken(user!);
	log.info("[success] Jwt token");
	res.status(200).json(result);
	return true;
}
