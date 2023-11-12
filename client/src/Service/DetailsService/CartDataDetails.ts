import ERROR_MESSAGES from "../../Message/Errors";
import CartTypes from "../../Types/CartTypes";

import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import { ICart } from "../../interface/User/Cart";
import { IUserFunctions } from "../../interface/User/User";
import Dish from "../../models/DishModel";
import Restaurant from "../../models/RestaurantModel";
import User from "../../models/UserModel";
import ValidateService from "../ValidateService";

export const CartDataDetails = {
	async get(cart: ICart[]): Promise<CartTypes.outputDataDetails[] | null> {
		const CartItems = await Promise.all(
			cart.map(async cartItem => {
				const cartItemData = cartItem.item.map(async dishes => {
					const dish = await Dish.findById(dishes.dish_id);
					return {
						_id: dishes._id,
						dish,
						quantity: dishes.quantity,
					};
				});
				return {
					user_id: cartItem.user_id,
					restaurant_id: cartItem.restaurant_id,
					item: await Promise.all(cartItemData),
				};
			})
		);

		return CartItems as CartTypes.outputDataDetails[];
	},

	async getWithRestaurantAndUser(cart: ICart[]) {
		// : Promise<CartTypes.outputDataDetails | null> {
		const cartItem = await this.get(cart);

		if (!cartItem) {
			throw new Error(ERROR_MESSAGES.INCORRECT_DATA);
		}

		// cartItem.map(async)

		// return {
		// 	user_id: cart.user_id,
		// 	restaurant_id: cart.restaurant_id,
		// 	item: cartItem,
		// };
	},
};
