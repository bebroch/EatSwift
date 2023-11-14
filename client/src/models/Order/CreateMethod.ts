import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";

export function CreateMethod(schema: mongoose.Schema) {
	schema.statics.createOrder = async function (
		data: OrderTypes.GetDataForCreate
	) {
		const { user_id, restaurant_id, item } = data;
		const order = new this({ user_id, restaurant_id, item });

		await order.save();
		return order.toObject();
	};
}
