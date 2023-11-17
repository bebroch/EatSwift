import mongoose from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";

export function UpdateStatus(schema: mongoose.Schema) {
	schema.methods.updateStatusIsProcessed = async function () {
		Log.infoStack("Order.updateStatusIsProcessed");
		return await this.setOrderStatus(
			OrderStatus.active,
			OrderStatus.isProcessed
		);
	};

	schema.methods.updateStatusDelivered = async function () {
		Log.infoStack("Order.updateStatusDelivered");
		return await this.setOrderStatus(
			OrderStatus.isProcessed,
			OrderStatus.delivered
		);
	};

	schema.methods.updateStatusCompleted = async function () {
		Log.infoStack("Order.updateStatusCompleted");
		return await this.setOrderStatus(
			OrderStatus.delivered,
			OrderStatus.completed
		);
	};

	schema.methods.updateStatusCanceled = async function () {
		Log.infoStack("Order.updateStatusCanceled");
		if (
			this.status === OrderStatus.completed ||
			this.status === OrderStatus.canceled
		)
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		return await this.setOrderStatus(this.status, OrderStatus.canceled);
	};

	schema.methods.setOrderStatus = async function (
		currentStatus: OrderStatus,
		futureStatus: OrderStatus
	) {
		Log.infoStack("Order.setOrderStatus");
		if (this.status !== currentStatus)
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		this.status = futureStatus;

		await this.save();

		return this.toObject();
	};
}
