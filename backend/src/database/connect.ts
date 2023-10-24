import { MONGO_URL } from "../envinfo";
import mongoose from "mongoose";

export default async function connectDB() {
	try {
		if (MONGO_URL) {
			await mongoose.connect(MONGO_URL);
			console.log("Connected to MongoDB");
		}
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}
