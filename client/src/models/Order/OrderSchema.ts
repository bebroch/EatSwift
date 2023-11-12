import mongoose from "mongoose";
import { OrderStatus } from "../../interface/User/Order";
import { OrderMethods } from "./OrderMethods";
 
const OrderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Restaurant",
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
		item: [
			{
				dish_id: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
				quantity: { type: Number, required: true },
			},
		],
	},
	{ timestamps: true }
);

OrderMethods(OrderSchema);

export default OrderSchema;
