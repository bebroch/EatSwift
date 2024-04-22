import Log from "../Service/Log";
import { MONGO_URL } from "../envInfo";
import mongoose from "mongoose";

async function connectDB() {
	try {
		if (MONGO_URL) {
			await mongoose.connect(MONGO_URL);
			Log.info("Connected to MongoDB");
		}
	} catch (error) {
		Log.error("Error connecting to MongoDB:", error);
	}
}

async function disconnectDB() {
	try {
		await mongoose.connection.close();
		Log.info("Disconnected from MongoDB");
	} catch (error: any) {
		Log.error("Error disconnecting from MongoDB:", error.message);
	}
}

export { connectDB, disconnectDB };
