import mongoose from "mongoose";
import Order from "../OrderModel";
import Cart from "../CartModel";
import { UserTypes } from "../../Types/UserTypes";

export function CartMethods(schema: mongoose.Schema) {
	schema.methods.getCart = async function () {
		return await Cart.findOne({ user_id: this._id }).lean();
	};

	schema.methods.getOrders = async function () {
		const orders = await Order.find({ user_id: this._id });
		return orders;
	};

	schema.methods.addToCart = async function (
		data: UserTypes.GetDataForAddToCart
	) {
		return await Cart.addToCart({
			...data,
			user_id: this._id,
		});
	};

	schema.methods.deleteItemFromCart = async function (
		data: UserTypes.GetDataForDelete
	) {
		await Cart.deleteItemFromCart({
			...data,
			user_id: this._id,
		});
	};
}
