import mongoose, { ObjectId } from "mongoose";
import Order from "../OrderModel";
import { UserTypes } from "../../Types/UserTypes";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";
import Cart from "../CartModel";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		return await Order.findUserHistoryOfOrders(this._id);
	};

	schema.methods.getActiveOrders = async function () {
		return await Order.findUserActiveOrders(this._id);
	};

	schema.methods.makeOrder = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
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
		const order = await Order.findOne({ _id: data.order_id as ObjectId });

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return await order.updateStatusCanceled();
	};
}
