import mongoose, { ObjectId } from "mongoose";
import Order from "../OrderModel";
import { UserTypes } from "../../Types/UserTypes";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";
import Cart from "../CartModel";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		Log.infoStack("User.getHistoryOfOrders");
		return await Order.findUserHistoryOfOrders(this._id);
	};

	schema.methods.getActiveOrders = async function () {
		Log.infoStack("User.getActiveOrders");
		return await Order.findUserActiveOrders(this._id);
	};

	schema.methods.makeOrder = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
		Log.infoStack("User.makeOrder");
		const cart = await this.getCartByRestaurant(data);

		if (!cart) return null;

		const order = await Order.createOrder(cart);

		await Cart.deleteOne({
			_id: cart._id,
		});

		return order;
	};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {
		Log.infoStack("User.cancelOrder");
		const order = await Order.findOne({ _id: data.order_id as ObjectId });

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return await order.updateStatusCanceled();
	};
}
