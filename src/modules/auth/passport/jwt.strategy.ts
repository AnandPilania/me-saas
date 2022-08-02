import config from "config";
import passport from "passport";
import JwtStrategy, { ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { log } from "../../../providers";
import { userServices } from "../../user";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get<string>("jwt_secret"),
	// algorithms: ["HS256"],
	// issuer: "grid-momenta.com",
	// audience: "grid-momenta.com",
};

const jwtPassport = passport.use(
	"jwt",
	new JwtStrategy.Strategy(options, async (jwtPayload: any, done: VerifiedCallback): Promise<void> => {
		log.info(`[payload] ${JSON.stringify(jwtPayload)}`);

		const user = await userServices.findUserById(jwtPayload.sub);

		if (user) {
			// Since we are here, the JWT is valid and our user is valid, so we are authorized!
			return done(null, user);
		} else {
			return done(null, false, { message: "Invalid jwt." });
		}
	}),
);

export default jwtPassport;
