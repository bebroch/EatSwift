import mongoose from "mongoose";
import OrderTypes from "../../Types/OrderTypes";
import Log from "../../Service/Log";

export function CreateMethod(schema: mongoose.Schema) {
	schema.statics.createOrder = async function (
		data: OrderTypes.GetDataForCreate
	) {
		Log.infoStack("Order.createOrder");
		const { user_id, restaurant_id, item } = data;
		const order = new this({ user_id, restaurant_id, item });

		await order.save();
		return order.toObject();
	};
}
