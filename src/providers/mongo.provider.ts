import mongoose from "mongoose";
import config from "config";
import { log } from "./";

const mongo_url = config.get<string>("mongo_url");

async function connectMongo(): Promise<void> {
	try {
		await mongoose.connect(mongo_url);
		log.info("Connected to MongoDB");
	} catch (err) {
		log.error(err);
		process.exit(1);
	}
}

export default connectMongo;
