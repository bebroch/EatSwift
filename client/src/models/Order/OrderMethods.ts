import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import ERROR_MESSAGES from "../../Message/Errors";

export function OrderMethods(schema: mongoose.Schema) {
	schema.statics.create = async function (data: OrderTypes.GetDataForCreate) {
		const { user_id, restaurant_id, item } = data;
		const order = new this({ user_id, restaurant_id, item });

		return await order.save();
	};
}
