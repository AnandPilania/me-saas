import { Request, Response } from "express";
import { CreateUserDto, userServices } from "./";
import { log } from "../../providers";

export async function createNewUser(req: Request<{}, {}, CreateUserDto>, res: Response): Promise<void> {
	log.info("[controller] createNewUser");
	const body = req.body;

	try {
		const user = await userServices.createUser(body);
		res.status(201).json(user);
	} catch (error: any) {
		if (error.code === 11000) {
			res.status(409).send("User already exists.");
		} else {
			res.status(500).send(error);
		}
	}
}
