import config from "config";
import jwt from "jsonwebtoken";
import { User } from "../user";
import { JwtObject } from "./passport/jwt.object";
import { log } from "../../providers";

const jwt_secret = config.get<string>("jwt_secret");

export function getToken(user: User): JwtObject {
	const payload = {
		sub: user._id,
		username: user.username,
		email: user.email,
		name: user.name,
		iat: new Date().getTime(),
		// iat: Date.now(),
		issuer: "grid-momenta.com",
		audience: "grid-momenta.com",
	};

	const expiresIn = "1d";

	try {
		const signedToken = jwt.sign(payload, jwt_secret, { expiresIn });

		return {
			token: signedToken,
			expires: expiresIn,
		};
	} catch (error) {
		log.info(error);
		return {
			token: "",
			expires: "",
		};
	}
}
