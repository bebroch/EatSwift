import mongoose from "mongoose";
import { CourierMethods } from "./CourierMethods";

const CourierSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		order_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: false,
		},
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

CourierMethods(CourierSchema);

export default CourierSchema;
