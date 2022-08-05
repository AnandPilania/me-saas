import config from "config";
import passport from "passport";
import JwtStrategy, { ExtractJwt, StrategyOptions, VerifiedCallback } from "passport-jwt";
import log from "../../../providers/logger.provider";
import usersService from "../../users/user.services";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.get<string>("jwt_secret"),
	// algorithms: ["HS256"],
};

const strategy = new JwtStrategy.Strategy(options, async (jwtPayload: any, done: VerifiedCallback): Promise<void> => {
	log.info(`[payload] ${JSON.stringify(jwtPayload)}`);

	const user = await usersService.findUserById(jwtPayload.sub);

	if (user) {
		// Since we are here, the JWT is valid and our user is valid, so we are authorized!
		return done(null, user);
	} else {
		return done(null, false, { message: "Invalid jwt." });
	}
});

const jwtPassport = passport.use("jwt", strategy);

export default jwtPassport;
