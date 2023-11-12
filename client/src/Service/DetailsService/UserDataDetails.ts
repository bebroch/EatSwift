import ERROR_MESSAGES from "../../Message/Errors";
import CartTypes from "../../Types/CartTypes";
import { UserTypes } from "../../Types/UserTypes";
import Dish from "../../models/DishModel";

export const UserDataDetails = {
	async get(
		user: UserTypes.GetDataForDetails
	): Promise<UserTypes.outputDataDetails | null> {
		const cart = user.cart;

		if (!cart) {
			return null;
		}

		const carts = await Promise.all(
			cart.map(async (cartItems: CartTypes.GetDataForDetails) => {
				const dishes = await Promise.all(
					cartItems.item.map(
						async (cartItem: CartTypes.GetDataItemForDetails) => {
							const dish = await Dish.findById(cartItem.dish_id);

							if (!dish) {
								throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
							}

							return {
								_id: cartItem._id,
								dish,
								quantity: cartItem.quantity,
							};
						}
					)
				);

				return {
					user_id: cartItems.user_id, // TODO Убрать user_id (Нужно создавать типы и проблема в том, что метод будет возвращать данные без user_id, которые возможно приведут к ошибке)
					restaurant_id: cartItems.restaurant_id,
					item: dishes,
				};
			})
		);

		return {
			...user,
			cart: carts,
		};
	},

	// async getWithCart(user: IUserFunctions) {
	// 	const cart = await user.getCart();

	// 	if (!cart) {
	// 		return {
	// 			...user,
	// 			cart: [],
	// 		};
	// 	}

	// 	const userCartData = await Promise.all(
	// 		cart.item.map(async cart => {
	// 			const dishData = await Dish.findOne({ _id: cart.dish_id });

	// 			return dishData;
	// 		})
	// 	);

	// 	const userWithCart = {
	// 		...user,
	// 		userCartData,
	// 	};

	// 	return userWithCart;
	// },
};
