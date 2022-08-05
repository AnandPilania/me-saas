import dotenv from "dotenv";
dotenv.config(); // Must be loaded before other imports
import express, { Application } from "express";
import "module-alias/register";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import config from "config";
import passport from "passport";
import log from "@providers/logger.provider";
import connectMongo from "@providers/mongo.provider";
import router from "./routes";
import { errorHandler } from "@middlewares/.";
import passportAuth from "@modules/auth/passport/auth.config";

class App {
	public app: Application;
	public port: number | string;

	public constructor() {
		this.app = express();
		this.port = config.get<number>("port");

		this.initializeDatabaseConnections().catch((error) => console.error(error));
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	public listen = (): void => {
		this.app.listen(this.port, () => {
			log.info(`=========================================`);
			log.info(`Server started on port ${this.port}`);
			log.info(`=========================================`);
		});
	};

	private initializeDatabaseConnections = async (): Promise<void> => {
		await connectMongo();
	};

	private initializeMiddlewares = (): void => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		// Enable CORS
		this.app.use(
			cors({
				origin: "*",
			}),
		);
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cookieParser());
		// Initialize passport
		this.app.use(passport.initialize());
		passportAuth(passport);
	};

	private initializeRoutes = (): void => {
		this.app.use(router);
	};

	private initializeErrorHandling = (): void => {
		// Error handler. Must be placed at the end of the middleware chain.
		this.app.use(errorHandler);
	};
}

const app = new App();
app.listen();
