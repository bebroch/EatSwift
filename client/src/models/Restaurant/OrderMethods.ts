import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import Order from "../OrderModel";
import { OrderStatus } from "../../interface/User/Order";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.getHistoryOfOrders = async function () {
		const orders = await Order.find({
			restaurant_id: this._id,
			status: { $ne: OrderStatus.active },
		}).lean();

		return orders;
	};

	schema.methods.getActiveOrders = async function () {
		const orders = await Order.find({
			restaurant_id: this._id,
			status: OrderStatus.active,
		}).lean();

		return orders;
	};

	schema.methods.updateOrder = async function (
		data: OrderTypes.GetDataForUpdate
	) {};

	schema.methods.cancelOrder = async function (
		data: OrderTypes.GetDataForCancel
	) {};
}
