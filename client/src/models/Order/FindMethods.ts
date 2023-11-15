import mongoose, { ObjectId } from "mongoose";
import { OrderModel } from "../../Enums/Order/OrderModels";
import Order from "../OrderModel";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";

export function FindOrderMethods(schema: mongoose.Schema) {
	// User
	schema.statics.findUserActiveOrders = async function (user_id: ObjectId) {
		return await Order.findActiveByModel(user_id, OrderModel.user_id);
	};

	schema.statics.findUserHistoryOfOrders = async function (
		user_id: ObjectId
	) {
		return await Order.findHistoryByModel(user_id, OrderModel.user_id);
	};

	// Restaurant
	schema.statics.findRestaurantActiveOrders = async function (
		restaurant_id: ObjectId
	) {
		return await Order.findActiveByModel(
			restaurant_id,
			OrderModel.restaurant_id
		);
	};

	schema.statics.findRestaurantHistoryOfOrders = async function (
		restaurant_id: ObjectId
	) {
		return await Order.findHistoryByModel(
			restaurant_id,
			OrderModel.restaurant_id
		);
	};

	// Courier
	schema.statics.findCourierActiveOrders = async function (
		courier_id: ObjectId
	) {
		return await Order.findActiveByModel(courier_id, OrderModel.courier_id);
	};

	schema.statics.findCourierHistoryOfOrders = async function (
		courier_id: ObjectId
	) {
		return await Order.findHistoryByModel(
			courier_id,
			OrderModel.courier_id
		);
	};

	schema.statics.findActiveOrdersForCourier = async function () {
		return await this.find({
			courier_id: { $exists: false },
			status: {
				$in: [
					OrderStatus.active,
					OrderStatus.isProcessed,
					OrderStatus.delivered,
				],
			},
		}).lean();
	};

	// Base Methods
	schema.statics.findHistoryByModel = async function (
		model_id: ObjectId,
		model: OrderModel
	) {
		const orders = await this.find({
			[model]: model_id,
			status: { $in: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();

		if (orders.length === 0)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return orders;
	};

	schema.statics.findActiveByModel = async function (
		model_id: ObjectId,
		model: OrderModel
	) {
		const orders = await this.find({
			[model]: model_id,
			status: { $nin: [OrderStatus.completed, OrderStatus.canceled] },
		}).lean();

		if (orders.length === 0)
			ExceptionErrorService.handler(ERROR_MESSAGES.ORDER_NOT_FOUND);

		return orders;
	};
}
