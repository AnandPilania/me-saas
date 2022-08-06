import log from "@providers/logger.provider";
import usersService from "@modules/users/user.services";
import { User } from "@modules/users/user.model";
import localStrategy from "./local.strategy";
import jwtStrategy from "./jwt.strategy";
import queryStrategy from "./query.strategy";

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

	// Implement strategies
	passport.use("local", localStrategy);
	passport.use("jwt", jwtStrategy);
	passport.use("query", queryStrategy);

	//TODO: Facebook
	//TODO: Twitter
	//TODO: Google
}
