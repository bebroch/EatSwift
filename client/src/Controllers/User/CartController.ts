import { Request, Response } from "express";
import Status from "../../Service/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import { IUserFunctions } from "../../interface/User/User";
import User from "../../models/UserModel";
import GetData from "../../Service/GetData";
import { DishTypes } from "../../Types/DishTypes";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import CartTypes from "../../Types/CartTypes";
import ExceptionService from "../../Service/ExceptionService";

class CartController {
	// Показать корзину пользователя
	async getCart(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		try {
			const cart = await user.getCart();
			const cartWithDishDetails = await DetailsService.Cart.get(cart);
			const cartDataFormatted =
				DataFormatter.Cart.getOnlyCart(cartWithDishDetails);
			return Status.success(res, { cart: cartDataFormatted });
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
		}
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
			return ExceptionService.handle(res, err.message);
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
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
		}
	}
}

export default new CartController();
