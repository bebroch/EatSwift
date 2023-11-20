import mongoose from "mongoose";
import { RestaurantMethods } from "./RestaurantMethods";

const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		description: { type: String, required: false },
		addresses: [{ type: String, required: false }],
		contactInfo: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

RestaurantMethods(RestaurantSchema);

export default RestaurantSchema;
