import mongoose from "mongoose";
import Order from "../OrderModel";
import { UserTypes } from "../../Types/UserTypes";
import { OrderStatus } from "../../interface/User/Order";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		const orders = await Order.find({
			user_id: this._id,
			status: { $in: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();

		return orders;
	};

	schema.methods.getActiveOrders = async function () {
		const orders = await Order.find({
			user_id: this._id,
			status: { $nin: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();

		return orders;
	};

	schema.methods.makeOrder = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
		const cart = await this.getCartByRestaurant(data);

		if (!cart) {
			return null;
		}

		const order = await Order.create(cart);

		return order;
	};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {
		const order = await Order.findById(data.order_id);

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.status === OrderStatus.canceled)
			throw new Error(ERROR_MESSAGES.ORDER_ALREADY_CANCELLED);

		order.status = OrderStatus.canceled;

		return order.save();
	};
}
