import mongoose from "mongoose";
import Order from "../OrderModel";
import { ICartItem } from "../../interface/User/User";

export function OrderMethods(schema: mongoose.Schema) {
	schema.methods.makeOrder = async function () {
		const dishesId = this.cart.map((itemCart: ICartItem) => {
			return itemCart.dish_id;
		});

		await Order.create({
			user_id: this._id,
			items: dishesId,
		});
	};
}
