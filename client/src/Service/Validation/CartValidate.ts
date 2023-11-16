import { ObjectId } from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import CartTypes from "../../Types/CartTypes";
import Dish from "../../models/DishModel";
import Restaurant from "../../models/RestaurantModel";
import User from "../../models/UserModel";
import { ICart, ICartItem } from "../../interface/Cart";
import { IUserFunctions } from "../../interface/User";
import { IRestaurantFunctions } from "../../interface/Restaurant";
import ExceptionErrorService from "../ExceptionErrorService";

export const CartValidate = {
	async checkDishExistInRestaurant(dishData: CartTypes.GetCartValidate) {
		const { dish, restaurant } = dishData;

		if (!dish) {
			ExceptionErrorService.handler(ERROR_MESSAGES.DISH_NOT_FOUND);
		}

		if (!restaurant) {
			ExceptionErrorService.handler(ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const isDishFound = (await restaurant.getDishes()).some(
			restaurantDish =>
				restaurantDish._id.toString() === dish._id.toString()
		);

		if (!isDishFound) {
			ExceptionErrorService.handler(
				ERROR_MESSAGES.DISH_NOT_FOUND_IN_RESTAURANT
			);
		}
	},

	checkExistRestaurant(cart: ICart[], restaurant_id: ObjectId) {
		return cart.findIndex((cartItem: ICart) => {
			return (
				cartItem.restaurant_id.toString() === restaurant_id.toString()
			);
		});
	},

	checkExistDishInCart(cart: ICart, dish_id: ObjectId) {
		return cart.item.findIndex((item: ICartItem) => {
			return item.dish_id.toString() === dish_id.toString();
		});
	},

	async checkExistData(data: CartTypes.GetDataForAddToCart) {
		const { dish_id, restaurant_id, user_id } = data;

		if (
			!(await Dish.findById(dish_id)) ||
			!(await Restaurant.findById(restaurant_id)) ||
			!(await User.findById(user_id))
		) {
			ExceptionErrorService.handler(ERROR_MESSAGES.INCORRECT_DATA);
		}
	},

	checkRestaurantAndUserExist(
		user: IUserFunctions,
		restaurant: IRestaurantFunctions
	) {
		if (!user) {
			ExceptionErrorService.handler(ERROR_MESSAGES.USER_NOT_FOUND);
		}
		if (!restaurant) {
			ExceptionErrorService.handler(ERROR_MESSAGES.USER_NOT_FOUND);
		}
	},
};
