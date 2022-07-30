import mongoose from "mongoose";
import config from "config";
import logger from "./logger.provider";

const mongo_url = config.get<string>("mongo_url");

async function connectMongo(): Promise<void> {
	try {
		await mongoose.connect(mongo_url);
		logger.info("Connected to MongoDB");
	} catch (err) {
		logger.error(err);
		process.exit(1);
	}
}

export default connectMongo;
