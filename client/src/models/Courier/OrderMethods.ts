import mongoose from "mongoose";
import Order from "../OrderModel";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";

export async function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getActiveOrder = async function () {
		const orders = await Order.find({ _id: this.order_id }).lean();
		return orders;
	};

	schema.methods.takeOrder = async function (
		orderData: OrderTypes.GetDataForMakeOrder
	) {
		const { order_id } = orderData;
		const order = await Order.findById(order_id);

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.courier_id)
			throw new Error(ERROR_MESSAGES.ORDER_ALREADY_TAKEN);

		if (this.order_id) throw new Error(ERROR_MESSAGES.ORDER_ALREADY_TAKEN);

		this.order_id = order._id;
		order.courier_id = this._id;

		this.save();
		await order.save();

		return order.toObject();
	};

	schema.methods.updateStatus = async function (
		statusData: OrderTypes.GetDataForUpdateStatus
	) {
		const { status } = statusData;
		const order = await Order.findById(this.order_id);

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		this.order_id = null;
		this.save();

		switch (status) {
			case OrderStatus.completed:
				return await order.updateStatusCompleted();
			case OrderStatus.canceled:
				return await order.updateStatusCanceled();
			default:
				throw new Error(ERROR_MESSAGES.INVALID_ORDER_STATUS);
		}
	};
}
