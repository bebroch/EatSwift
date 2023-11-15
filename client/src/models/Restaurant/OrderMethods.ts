import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import Order from "../OrderModel";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		return await Order.findRestaurantHistoryOfOrders(this._id);
		// return await Order.find({
		// 	restaurant_id: this._id,
		// 	status: { $ne: OrderStatus.active },
		// }).lean();
	};

	schema.methods.getActiveOrders = async function () {
		return await Order.findRestaurantActiveOrders(this._id);
		// return await Order.find({
		// 	restaurant_id: this._id,
		// 	status: OrderStatus.active,
		// }).lean();
	};

	schema.methods.updateOrder = async function (
		data: OrderTypes.GetDataForUpdate
	) {
		const { order_id, status } = data;
		const order = await Order.findById(order_id);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		switch (status) {
			case OrderStatus.isProcessed:
				return await order.updateStatusIsProcessed();
			case OrderStatus.delivered:
				return await order.updateStatusDelivered();
			case OrderStatus.canceled:
				if (order.status === OrderStatus.delivered) break;
				return await order.updateStatusCanceled();
		}

		ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);
	};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {
		const { order_id } = data;
		const order = await Order.findById(order_id);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return await order.updateStatusCanceled();
	};
}
