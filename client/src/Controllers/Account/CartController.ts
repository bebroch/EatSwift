import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Seccuess";
import CartService from "../../Services/DatabaseServices/Cart/CartService";
import getUser from "../../Services/Internet/GetBody/getUser";
import { getDish } from "../../Services/Internet/GetBody/getDish";

class CartController {
	// Показать корзину пользователя
	async getCart(req: Request, res: Response) {
		const user = await getUser(req);
		const cart = await CartService.getCartDetails(user);

		return Status.success(res, { cart });
	}

	// Добавить в корзину пользователя
	async addToCart(req: Request, res: Response) {
		const user = await getUser(req);
		const item_id = await getDish(req);

		try {
			await user.addToCart({ _id: item_id });
			return Status.success(
				res,
				SUCCESS_MESSAGE.ITEM_SUCCESSFULLY_ADDED_TO_CART
			);
		} catch (err) {
			return Status.badRequest(res, ERROR_MESSAGES.DISH_NOT_FOUND);
		}
	}

	// Удалить блюдо из корзины пользователя
	async deleteItemFromCart(req: Request, res: Response) {
		const user = await getUser(req);
		const item_id = await getDish(req);

		try {
			await user.deleteItemFromCart({ _id: item_id });
			return Status.success(
				res,
				SUCCESS_MESSAGE.ITEM_SUCCESSFULLY_DELETED_FROM_CART
			);
		} catch (err) {
			console.log(err);
			return Status.badRequest(
				res,
				ERROR_MESSAGES.DISH_NOT_FOUND_IN_CART
			);
		}
	}
}

export default new CartController();
