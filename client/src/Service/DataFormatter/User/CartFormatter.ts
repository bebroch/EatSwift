import { ICartItem } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const CartFormatter = {
	// Обновить types
	get(cart: ICartItem | ICartItem[]) {
		if (Array.isArray(cart)) {
			let total = 0;
			const cartData = cart.map(item => {
				total += item.dish.price * item.quantity;
				return {
					...BaseFormatter.getCartFields(item),
					dish: DataFormatter.Dish.get(item.dish),
				};
			});

			return {
				total,
				items: cartData,
			};
		}

		return {
			...BaseFormatter.getCartFields(cart),
			dish: DataFormatter.Dish.get(cart.dish),
		};
	},
};
