import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { IUserFunctions } from "../../interface/User/User";
import { formatterDataCart } from "../../Services/DatabaseServices/Data/Formatter/User/DataFormatterCart";
import {
	getDishDataForAddToCart,
	getDishDataForDeleteFromCart,
} from "../../Services/Internet/GetBody/Restaurant/getDishData";
import {
	IDishDataForAddToCart,
	IDishDataForDeleteFromCart,
} from "../../interface/Restaurant/DIsh/DishTypes";

class CartController {
	// Показать корзину пользователя
	async getCart(req: Request, res: Response) {
		const user = getUser(req) as IUserFunctions;
		const cart = await user.getCart();
		// const cartDataFormatted = formatterDataCart.getCartData(cart);
		// const cart = await CartService.getCartDetails(user);

		// return Status.success(res, cartDataFormatted);
	}

	// Добавить в корзину пользователя
	async addToCart(req: Request, res: Response) {
		const user = getUser(req) as IUserFunctions;
		const dishData = getDishDataForAddToCart(
			req as Request & IDishDataForAddToCart
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
		const user = getUser(req) as IUserFunctions;
		const dishData = getDishDataForDeleteFromCart(
			req as Request & IDishDataForDeleteFromCart
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

export default new CartController();
