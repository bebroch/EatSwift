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
	async get(cart: ICart): Promise<CartTypes.outputItemDataDetails[] | null> {
		const CartItems = await Promise.all(
			cart.item.map(async item => {
				const dish = await Dish.findById(item.dish_id);
				return {
					_id: item.dish_id,
					dish,
					quantity: item.quantity,
				};
			})
		);

		return CartItems as CartTypes.outputItemDataDetails[];
	},

	async getWithRestaurantAndUser(
		cart: ICart
	): Promise<CartTypes.outputDataDetails | null> {
		if (!cart || !cart.item || !cart.user_id || !cart.restaurant_id) {
			throw new Error(ERROR_MESSAGES.INCORRECT_DATA);
		}

		const user = (await User.findById(cart.user_id)) as IUserFunctions;
		const restaurant = (await Restaurant.findById(
			cart.restaurant_id
		)) as IRestaurantFunctions;

		ValidateService.Cart.checkRestaurantAndUserExist(user, restaurant);

		const cartItem = await this.get(cart);

		if (!cartItem) {
			throw new Error(ERROR_MESSAGES.INCORRECT_DATA);
		}

		return {
			user,
			restaurant,
			item: cartItem,
		};
	},
};
