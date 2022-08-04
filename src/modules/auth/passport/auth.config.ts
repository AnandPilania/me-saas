import path from "path";
import log from "../../../providers/logger.provider";
import usersService from "../../users/user.services";
import { User } from "../../users/user.model";

export default function (passport: any): void {
	log.info("[passport] auth config");

	passport.serializeUser(function (user: User, done: any) {
		log.info("[serialize]");
		done(null, false);
	});
	passport.deserializeUser(function (id: string, done: any) {
		log.info("[deserialize]", id);

		const user = usersService.findUserById(id);
		if (user) {
			done(null, user);
		}
	});

	//load strategy files
	require(path.join(__dirname, "local.strategy"));
	require(path.join(__dirname, "jwt.strategy"));
	//TODO: Facebook
	//TODO: Twitter
	//TODO: Google
}
