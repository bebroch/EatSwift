import mongoose from "mongoose";
import Order from "../OrderModel";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";
import { CourierTypes } from "../../Types/CourierTypes";

export async function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getActiveOrder = async function () {
		Log.infoStack("Courier.getActiveOrder");

		const order = await Order.findOne({ _id: this.order_id }).lean();

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.status === OrderStatus.canceled) {
			this.order_id = undefined;
			await this.save();
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_CANCELED); /// 1
		}

		return order;
	};

	schema.methods.getOrderFromHistory = async function (
		data: CourierTypes.GetOrderFromHistory
	) {
		Log.infoStack("Courier.getOrderFromHistory");
		const order = await Order.findOne({ _id: data.order_id }).lean();
		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);
		return order;
	};

	schema.methods.getHistoryOfOrders = async function () {
		Log.infoStack("Courier.getHistoryOfOrders");
		return await Order.findCourierHistoryOfOrders(this._id);
	};

	schema.methods.takeOrder = async function (
		orderData: OrderTypes.GetDataForMakeOrder
	) {
		Log.infoStack("Courier.takeOrder");
		const { order_id } = orderData;
		const order = await Order.findById(order_id);

		if (this.order_id)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_ALREADY_TAKEN);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.courier_id)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_ALREADY_TAKEN);

		this.order_id = order._id;
		order.courier_id = this._id;

		this.save();
		await order.save();

		return order.toObject();
	};

	schema.methods.updateStatus = async function (
		statusData: OrderTypes.GetDataForUpdateStatus
	) {
		Log.infoStack("Courier.updateStatus");
		const { status } = statusData;
		const order = await Order.findById(this.order_id);

		if (!order)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		if (order.status !== OrderStatus.delivered)
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		this.order_id = undefined;
		this.save();

		switch (status) {
			case OrderStatus.completed:
				return await order.updateStatusCompleted();
			case OrderStatus.canceled:
				return await order.updateStatusCanceled();
		}
	};
}
