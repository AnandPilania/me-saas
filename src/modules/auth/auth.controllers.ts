import { Request, Response, NextFunction } from "express";
import log from "@providers/logger.provider";
import usersService, { UsersService } from "@modules/users/user.services";
import { LoginDto } from "./auth.schema";
import authService, { AuthServices } from "./auth.services";

export class AuthController {
	private usersService: UsersService = usersService;
	private authService: AuthServices = authService;

	public protectedRoute = async (req: Request, res: Response): Promise<void> => {
		res.status(200).send("Protected route");
	};

	public authenticateUser = async (
		req: Request<{}, {}, LoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<boolean> => {
		log.info("[controller] authenticateUser");

		const body = req.body;

		// Find user by username
		const user = await this.usersService.findUserByUsername(body.username);

		if (!user) {
			log.error("[error] user not found");
			res.status(404).send("User not found.");
			return false;
		}

		// Verify password
		const isValid = await this.usersService.verifyUserPassword(user.password, body.password);

		if (!isValid) {
			log.error("[error] Invalid username or password");
			res.status(401).send("Invalid username or password.");
			return false;
		}
		const result = this.authService.getToken(user);
		log.info("[success] Jwt token generated");
		res.status(200).json(result);
		return true;
	};
}

const authController: AuthController = new AuthController();

export default authController;
