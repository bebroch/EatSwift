import mongoose from "mongoose";
import { CartMethods } from "./CartMethods";

const CartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Restaurant",
		},
		item: [
			{
				dish_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Dish",
				},
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

CartMethods(CartSchema);

export default CartSchema;
