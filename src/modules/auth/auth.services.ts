import config from "config";
import jwt from "jsonwebtoken";
import { User } from "@modules/users/user.model";
import { IJwtObject, IJwtPayload } from "@common/types/jwt.types";
import log from "@providers/logger.provider";

const jwt_secret = config.get<string>("jwt_secret");

export class AuthServices {
	public getToken = (user: User): IJwtObject => {
		const payload: IJwtPayload = {
			sub: user._id!.toString(),
			username: user.username,
			email: user.email,
			name: user.name,
			iat: new Date().getTime(),
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
	};
}

const authService: AuthServices = new AuthServices();

export default authService;
