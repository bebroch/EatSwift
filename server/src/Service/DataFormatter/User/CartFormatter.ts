import CartTypes from "../../../Types/CartTypes";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const CartFormatter = {
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
						if (!item.dish) 
							return item;
						
						return {
							...DataFormatter.Dish.get(item.dish),
							quantity: item.quantity,
						};
					}
				);
				return {
					...cartItem,
					item: cartItemData,
				};
			}
		);

		return cartItemsData as CartTypes.outputDataDetails[];
	},

	getCartItem(cartItem: CartTypes.GetDataItemDetails) {
		return {
			...BaseFormatter.getCartItemFields(cartItem),
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
