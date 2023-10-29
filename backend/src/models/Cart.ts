import mongoose, { Document, Model, ObjectId } from "mongoose";
import ICart from "../interface/Cart";

const CartSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Dish",
	},
	status: { type: String, required: true },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

const Cart: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
