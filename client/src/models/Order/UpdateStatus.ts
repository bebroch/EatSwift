import mongoose from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import { OrderStatus } from "../../Enums/Order/OrderStatus";

export function UpdateStatus(schema: mongoose.Schema) { 

	schema.methods.updateStatusIsProcessed = async function () {
		return await this.setOrderStatus(
			OrderStatus.active,
			OrderStatus.isProcessed
		);
	};

	schema.methods.updateStatusDelivered = async function () {
		return await this.setOrderStatus(
			OrderStatus.isProcessed,
			OrderStatus.delivered
		);
	};

	schema.methods.updateStatusCompleted = async function () {
		return await this.setOrderStatus(
			OrderStatus.delivered,
			OrderStatus.completed
		);
	};

	schema.methods.updateStatusCanceled = async function () {
		if (
			this.status === OrderStatus.completed ||
			this.status === OrderStatus.canceled
		)
			throw new Error(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		return await this.setOrderStatus(this.status, OrderStatus.canceled);
	};

	schema.methods.setOrderStatus = async function (
		currentStatus: OrderStatus,
		futureStatus: OrderStatus
	) {
		if (this.status !== currentStatus)
			throw new Error(ERROR_MESSAGES.INVALID_ORDER_STATUS);

		this.status = futureStatus;

		await this.save();

		return this.toObject();
	};
}
