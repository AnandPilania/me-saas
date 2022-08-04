import { Request, Response } from "express";
import { CreateUserDto } from "./user.schema";
import usersService, { UsersService } from "./user.services";
import log from "../../providers/logger.provider";

export class UsersController {
	private usersService: UsersService = usersService;

	public createNewUser = async (req: Request<{}, {}, CreateUserDto>, res: Response): Promise<void> => {
		log.info("[controller] createNewUser");
		const body = req.body;

		try {
			const user = await this.usersService.createUser(body);
			res.status(201).json(user);
		} catch (error: any) {
			if (error.code === 11000) {
				res.status(409).send("User already exists.");
			} else {
				res.status(500).send(error);
			}
		}
	};
}

const usersController: UsersController = new UsersController();

export default usersController;
