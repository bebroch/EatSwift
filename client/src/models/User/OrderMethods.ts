import mongoose from "mongoose";
import Order from "../OrderModel";
import { UserTypes } from "../../Types/UserTypes";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.makeOrder = async function (
		data: UserTypes.GetDataForMakeOrder
	) {
		const cart = await this.getCartByRestaurant(data);

		if (!cart) {
			return null;
		}

		const order = await Order.create(cart);

		return order;
	};
}
