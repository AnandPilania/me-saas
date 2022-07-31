require("dotenv").config();
import express from "express";
import cors from "cors";
import config from "config";
import { connectMongo, log } from "./providers";
import router from "./routes";
import { errorHandler } from "./middlewares";

const app = express();
app.use(express.json());

// Enable CORS
app.use(
	cors({
		origin: "*",
	}),
);

app.use(router);

// Error handler. Must be placed at the end of the middleware chain.
app.use(errorHandler);

const port = config.get<number>("port");

app.listen(port, async () => {
	log.info(`Server started on port ${port}`);

	await connectMongo();
});
