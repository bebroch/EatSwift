import ERROR_MESSAGES from "../../Message/Errors";
import CartTypes from "../../Types/CartTypes";
import { UserTypes } from "../../Types/UserTypes";
import { IUserFunctions } from "../../interface/User/User";
import Dish from "../../models/DishModel";
import ExceptionErrorService from "../ExceptionErrorService";

export const UserDataDetails = {
	async get(
		user: UserTypes.GetDataForDetails
	): Promise<UserTypes.outputDataDetails | null> {
		const cartData = user.cart;

		if (!cartData) {
			return this.getOnlyUser(user);
		}

		const { cart } = await this.getCarts(cartData);

		return { ...user, cart };
	},

	getOnlyUser(user: IUserFunctions) {
		return { ...user };
	},

	async getCarts(cart: CartTypes.GetDataForDetails[]) {
		const carts = cart.map(
			async (cartItems: CartTypes.GetDataForDetails) => {
				const dishes = cartItems.item.map(
					async (cartItem: CartTypes.GetDataItemForDetails) => {
						const dish = await Dish.findById(cartItem.dish_id);

						if (!dish)
							ExceptionErrorService.handler(
								ERROR_MESSAGES.DISH_NOT_FOUND
							);

						return {
							_id: cartItem._id,
							dish,
							quantity: cartItem.quantity,
						};
					}
				);

				return {
					user_id: cartItems.user_id, // TODO Убрать user_id (Нужно создавать типы и проблема в том, что метод будет возвращать данные без user_id, которые возможно приведут к ошибке)
					restaurant_id: cartItems.restaurant_id,
					item: await Promise.all(dishes),
				};
			}
		);
		return { cart: await Promise.all(carts) }; // 1
	},
};
