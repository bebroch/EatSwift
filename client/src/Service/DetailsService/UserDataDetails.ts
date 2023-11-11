import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { ICartItem, IUserFunctions } from "../../interface/User/User";
import Dish from "../../models/DishModel";

export const UserDataDetails = {
	async getWithCart(user: IUserFunctions) {
		const userCartData = await Promise.all(
			user.cart.map(async cart => {
				const dishData = await Dish.findOne({ _id: cart.dish_id });

				return dishData;
			})
		);

		const userWithCart = {
			...user,
			userCartData,
		};

		return userWithCart;
	},
};
