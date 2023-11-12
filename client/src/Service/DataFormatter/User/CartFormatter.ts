import CartTypes from "../../../Types/CartTypes";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const CartFormatter = {
	//TODO Обновить types
	getOnlyCart(
		cartItems: CartTypes.GetDataDetails[] | null
	): CartTypes.outputDataDetails[] | null {
		if (!cartItems) {
			return null;
		}

		const cartItemsData = cartItems.map(
			(cartItem: CartTypes.GetDataDetails) => {
				const cartItemData = cartItem.item.map(
					(item: CartTypes.GetDataItemDetails) => {
						return { ...DataFormatter.Dish.get(item.dish) };
					}
				);
				return {
					...cartItem,
					item: cartItemData,
				};
			}
		);

		return cartItemsData as CartTypes.outputDataDetails[];

		// if (Array.isArray(cartItems)) {
		// 	return cartItems.map(item => CartFormatter.getOnlyCart(item));
		// }

		// if (Array.isArray(cartItem)) {
		// 	return cartItem.map(item => this.getCartItem(item));
		// }

		// return this.getCartItem(cartItem.item);
	},

	getCartItem(cartItem: CartTypes.GetDataItemDetails) {
		return {
			...(BaseFormatter.getCartItemFields(
				cartItem
			) as CartTypes.outputItemDataDetails),
		};
	},

	getWithRestaurantAndUser(
		data: CartTypes.GetDataDetails
	): CartTypes.outputDataDetails | null {
		const dishes = data.item.map(item => {
			return {
				...BaseFormatter.getCartItemFields(item),
				dish: DataFormatter.Dish.get(item.dish),
			};
		}) as CartTypes.GetDataItemDetails[];

		return {
			user_id: data.user_id,
			restaurant_id: data.restaurant_id,
			item: dishes,
		};
	},
};
