import mongoose, { ObjectId } from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import { IOrder, OrderStatus } from "../../interface/User/Order";
import ERROR_MESSAGES from "../../Message/Errors";

export function OrderMethods(schema: mongoose.Schema) {
	schema.statics.createOrder = async function (
		data: OrderTypes.GetDataForCreate
	) {
		const { user_id, restaurant_id, item } = data;
		const order = new this({ user_id, restaurant_id, item });

		return await order.save();
	};

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
		return await this.setOrderStatus(
			OrderStatus.completed,
			OrderStatus.canceled
		);
	};

	schema.statics.findActiveOrders = async function (_id: ObjectId) {
		return await this.find({
			user_id: _id,
			status: { $nin: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();
	};

	schema.statics.findHistoryOfOrders = async function (_id: ObjectId) {
		return await this.find({
			user_id: _id,
			status: { $in: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();
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
