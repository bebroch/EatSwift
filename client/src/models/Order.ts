import mongoose, { Model } from "mongoose";
import { IOrder, OrderStatus } from "../interface/Order";

const OrderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		status: {
			type: String,
			enum: [
				OrderStatus.active,
				OrderStatus.isProcessed,
				OrderStatus.delivered,
				OrderStatus.completed,
				OrderStatus.canceled,
			],
			default: "active",
		},
		items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
