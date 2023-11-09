import { Request, Response } from "express";
import Status from "../../Service/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import { IUserFunctions } from "../../interface/User/User";
import User from "../../models/UserModel";
import GetData from "../../Service/GetData";
import { DishTypes } from "../../Types/DishTypes";

class CartController {
	// Показать корзину пользователя
	async getCart(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const cart = await user.getCart();
		// const cartDataFormatted = formatterDataCart.getCartData(cart);
		// const cart = await CartService.getCartDetails(user);

		// return Status.success(res, cartDataFormatted);
	}

	// Добавить в корзину пользователя
	async addToCart(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const dishData = GetData.Dish.AddToCart(
			req as Request & DishTypes.GetDataForAddToCart
		);

		try {
			await user.addToCart(dishData);
			return Status.success(
				res,
				SUCCESS_MESSAGE.ITEM_SUCCESSFULLY_ADDED_TO_CART
			);
		} catch (err: any) {
			console.log(err);
			if (err.message === ERROR_MESSAGES.DISH_NOT_FOUND)
				return Status.badRequest(res, ERROR_MESSAGES.DISH_NOT_FOUND);
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}
	}

	// Удалить блюдо из корзины пользователя
	async deleteItemFromCart(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const dishData = GetData.Dish.DeleteFromCart(
			req as Request & DishTypes.GetDataForDeleteFromCart
		);

		try {
			await user.deleteItemFromCart(dishData);
			return Status.success(
				res,
				SUCCESS_MESSAGE.ITEM_SUCCESSFULLY_DELETED_FROM_CART
			);
		} catch (err) {
			return Status.badRequest(
				res,
				ERROR_MESSAGES.DISH_NOT_FOUND_IN_CART
			);
		}
	}
}

export default new CartController(); // 1
