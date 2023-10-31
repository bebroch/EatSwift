import { MONGO_URL } from "../envInfo";
import mongoose from "mongoose";

async function connectDB() {
	try {
		if (MONGO_URL) {
			await mongoose.connect(MONGO_URL);
			console.log("Connected to MongoDB");
		}
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}

async function disconnectDB() {
	try {
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
	} catch (error) {
		console.error("Error disconnecting from MongoDB:", error);
	}
}

export { connectDB, disconnectDB };
