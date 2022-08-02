import path from "path";
import { User, userServices } from "../../user";
import { log } from "../../../providers";

export default function (passport: any) {
	log.info("[auth config]");

	passport.serializeUser(function (user: User, done: any) {
		log.info("[serialize]");
		done(null, false);
	});
	passport.deserializeUser(function (id: string, done: any) {
		log.info("[deserialize]", id);

		const user = userServices.findUserById(id);
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
