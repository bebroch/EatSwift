import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import Order from "../OrderModel";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		Log.infoStack("Restaurant.getHistoryOfOrders");
		return await Order.findRestaurantHistoryOfOrders(this._id);
	};

	schema.methods.getActiveOrders = async function () {
		Log.infoStack("Restaurant.getActiveOrders");
		return await Order.findRestaurantActiveOrders(this._id);
	};

	schema.methods.updateOrder = async function (
		data: OrderTypes.GetDataForUpdate
	) {
		Log.infoStack("Restaurant.updateOrder");
		const { order_id, status } = data;
		const order = await Order.findById(order_id);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.status === OrderStatus.delivered)
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		switch (status) {
			case OrderStatus.isProcessed:
				return await order.updateStatusIsProcessed();
			case OrderStatus.delivered:
				return await order.updateStatusDelivered();
			case OrderStatus.canceled:
				return await order.updateStatusCanceled();
		}

		ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);
	};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {
		Log.infoStack("Restaurant.cancelOrder");
		const { order_id } = data;
		const order = await Order.findById(order_id);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return await order.updateStatusCanceled();
	};
}
