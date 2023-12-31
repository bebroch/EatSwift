import mongoose from "mongoose";
import Order from "../OrderModel";
import Cart from "../CartModel";
import { UserTypes } from "../../Types/UserTypes";
import Log from "../../Service/Log";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";

export function CartMethods(schema: mongoose.Schema) {
	schema.methods.getCart = async function () {
		Log.infoStack("User.getCart");
		const cart = await Cart.find({ user_id: this._id }).lean();

		if (cart.length === 0)
			ExceptionErrorService.handler(ERROR_MESSAGES.CART_NOT_FOUND);

		return cart;
	};

	schema.methods.getCartByRestaurant = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
		Log.infoStack("User.getCartByRestaurant");
		const { restaurant_id } = data;
		return await Cart.findOne({ user_id: this._id, restaurant_id }).lean();
	};

	schema.methods.getOrders = async function () {
		Log.infoStack("User.getOrders");
		const orders = await Order.find({ user_id: this._id });
		return orders;
	};

	schema.methods.addToCart = async function (
		data: UserTypes.GetDataForAddToCart
	) {
		Log.infoStack("User.addToCart");
		return await Cart.addToCart({
			...data,
			user_id: this._id,
		});
	};

	schema.methods.deleteItemFromCart = async function (
		data: UserTypes.GetDataForDelete
	) {
		Log.infoStack("User.deleteItemFromCart");
		await Cart.deleteItemFromCart({
			...data,
			user_id: this._id,
		});

		const { restaurant_id } = data;
		const cart = await this.getCartByRestaurant({ restaurant_id });

		if (cart.item.length === 0)
			await Cart.deleteOne({ user_id: this._id, restaurant_id });
	};
}
