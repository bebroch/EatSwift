import CartTypes from "../../../Types/CartTypes";
import { IRestaurantFunctions } from "../../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const CartFormatter = {
	// Обновить types
	getOnlyCart(
		cartItem: CartTypes.GetDataItemDetails | CartTypes.GetDataItemDetails[]
	):
		| CartTypes.outputItemDataDetails
		| CartTypes.outputItemDataDetails[]
		| null {
		if (!cartItem) {
			return null;
		}

		if (Array.isArray(cartItem)) {
			return cartItem.map(item => {
				return this.getCartItem(item);
			});
		}

		return this.getCartItem(cartItem);
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
		const user = DataFormatter.User.getOnlyUser(
			data.user
		) as IUserFunctions | null;
		const restaurant = DataFormatter.Restaurant.get(
			data.restaurant
		) as IRestaurantFunctions | null;
		const dishes = data.item.map(item => {
			return {
				...BaseFormatter.getCartItemFields(item),
				dish: DataFormatter.Dish.get(item.dish),
			};
		}) as CartTypes.GetDataItemDetails[];

		if (!user || !restaurant || !dishes) {
			return null;
		}

		return {
			user,
			restaurant,
			item: dishes,
		};
	},
};
