import { ICartItem } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const CartFormatter = {
	// Обновить types
	get(cart: ICartItem | ICartItem[]) {
		if (Array.isArray(cart)) {
			return cart.map(item => {
				return {
					...BaseFormatter.getCartFields(item),
					dish: DataFormatter.Dish.get(item.dish),
				};
			});
		}

		return {
			...BaseFormatter.getCartFields(cart),
			dish: DataFormatter.Dish.get(cart.dish),
		};
	},
};
