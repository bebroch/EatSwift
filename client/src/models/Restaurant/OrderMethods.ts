import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import Order from "../OrderModel";
import { OrderStatus } from "../../interface/User/Order";
import ERROR_MESSAGES from "../../Message/Errors";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		return await Order.find({
			restaurant_id: this._id,
			status: { $ne: OrderStatus.active },
		}).lean();
	};

	schema.methods.getActiveOrders = async function () {
		return await Order.find({
			restaurant_id: this._id,
			status: OrderStatus.active,
		}).lean();
	};

	schema.methods.updateOrder = async function (
		data: OrderTypes.GetDataForUpdate
	) {
		const { order_id, status } = data;
		const order = await Order.findById(order_id);

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		switch (status) {
			case OrderStatus.isProcessed:
				return await order.updateStatusIsProcessed();
			case OrderStatus.delivered:
				return await order.updateStatusDelivered();
			default:
				throw new Error(ERROR_MESSAGES.INVALID_ORDER_STATUS);
		}
	};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {
		const { order_id } = data;
		const order = await Order.findById(order_id);

		if (!order) throw new Error(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return await order.updateStatusCanceled();
	};
}
