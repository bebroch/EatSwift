import mongoose from "mongoose";
import Order from "../OrderModel";
import Cart from "../CartModel";
import { UserTypes } from "../../Types/UserTypes";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";

export function CartMethods(schema: mongoose.Schema) {
	schema.methods.getCart = async function () {
		const cart = await Cart.find({ user_id: this._id }).lean();

		if (cart.length === 0)
			ExceptionErrorService.handler(ERROR_MESSAGES.CART_NOT_FOUND);

		return cart;
	};

	schema.methods.getCartByRestaurant = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
		const { restaurant_id } = data;
		return await Cart.findOne({ user_id: this._id, restaurant_id }).lean();
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
