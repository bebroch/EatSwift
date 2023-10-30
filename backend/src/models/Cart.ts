import mongoose, { Document, Model, ObjectId } from "mongoose";
import { ICart, ICartModel } from "../interface/Cart";

const CartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Dish",
		},
		status: {
			type: String,
			enum: [
				"active",
				"isProcessed",
				"delivered",
				"completed",
				"canceled",
			],
			default: "active",
		},
		items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

CartSchema.statics.createCart = async function (user_id: ObjectId) {
	const cart = new this({ user_id });
	return cart.save();
};

const Cart = mongoose.model<ICart, ICartModel>("Cart", CartSchema);

export default Cart;
