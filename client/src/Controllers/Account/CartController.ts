import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import CartService from "../../Services/DatabaseServices/Data/Cart/CartService";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { getDish } from "../../Services/Internet/GetBody/getDish";
import { IUserFunctions } from "../../interface/User/User";

class CartController {
	// Показать корзину пользователя
	async getCart(req: Request, res: Response) {
		const user = (await getUser(req)) as IUserFunctions;
		const cart = await CartService.getCartDetails(user);

		return Status.success(res, { cart });
	}

	// Добавить в корзину пользователя
	async addToCart(req: Request, res: Response) {
		const user = (await getUser(req)) as IUserFunctions;
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
		const user = (await getUser(req)) as IUserFunctions;
		const item_id = await getDish(req);

		try {
			await user.deleteItemFromCart({ _id: item_id });
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
