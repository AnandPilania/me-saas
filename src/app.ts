require("dotenv").config();
import express from "express";
import config from "config";
import { connectMongo, log } from "./providers";

const app = express();
app.use(express.json());

const port = config.get<number>("port");

app.listen(port, async () => {
	log.info(`Server started on port ${port}`);

	await connectMongo();
});
