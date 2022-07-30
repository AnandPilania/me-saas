import { UserModel, User, CreateUserDto } from "./";
import { log } from "../../providers";

export function createUser(data: CreateUserDto): Promise<User> {
	log.info("[service] createUser");

	const user = UserModel.create(data);

	return user;
}
