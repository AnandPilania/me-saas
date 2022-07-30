require("dotenv").config();
import express from "express";
import config from "config";
import { connectMongo, log } from "./providers";
import router from "./routes";

const app = express();
app.use(express.json());

app.use(router);

const port = config.get<number>("port");

app.listen(port, async () => {
	log.info(`Server started on port ${port}`);

	await connectMongo();
});
