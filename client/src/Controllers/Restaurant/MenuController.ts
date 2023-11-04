import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import {
	getRestaurantFromAccount,
	getRestaurantFromParams,
} from "../../Services/Internet/GetBody/Restaurant/getRestaurant";
import { TAccount } from "../../interface/Account/Account";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import getMenu from "../../Services/Internet/GetBody/Restaurant/getMenu";
import SUCCESS_MESSAGE from "../../Message/Success";
import ERROR_MESSAGES from "../../Message/Errors";
import DataFormatter from "../../Services/DatabaseServices/Data/DataFormatter";
import {
	getMenuDataForCreate,
	getMenuDataForDelete,
} from "../../Services/Internet/GetBody/Restaurant/getMenuData";
import Menu from "../../models/Menu";
import getMenuFromRequest from "../../Services/Internet/GetBody/Restaurant/getMenu";

class MenuController {
	// TODO Сделать, показ всех меню
	async getMenusFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromParams(req)) as IRestaurant;
		return Status.success(res, restaurant.menu);
	}

	// TODO Сделать, показ одного меню
	async getMenuFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromParams(req)) as IRestaurant;
		const menu = await getMenuFromRequest(req, restaurant);
		return Status.success(res, menu);
	}

	// TODO Сделать, показ всех меню
	async getMenusFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;
		const menu = await restaurant.getMenus();
		return Status.success(res, menu);
	}

	// TODO Сделать, показ одного меню
	async getMenuFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromAccount(req)) as IRestaurant;
		const menu = await getMenuFromRequest(req, restaurant);
		return Status.success(res, menu);
	}

	async createMenu(req: Request & { account?: TAccount }, res: Response) {
		const menuDataForCreate = await getMenuDataForCreate(req);
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;

		const menu = await restaurant.createMenu(menuDataForCreate);

		if (!menu) {
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_CREATED);
		}

		const formattedMenuData = await DataFormatter.getMenu(menu);

		return Status.success(res, { menu: formattedMenuData });
	}

	// TODO Сделать, удаление меню
	async deleteMenu(req: Request, res: Response) {
		const menuData = await getMenuDataForDelete(req);

		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;

		type NewType = Error;

		try {
			await restaurant.deleteMenu(menuData);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.MENU_NOT_FOUND) {
				return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);
			}
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		return Status.success(
			res,
			SUCCESS_MESSAGE.MENU_SUCCESSFULLY_DELETED_FROM_RESTAURANT
		);
	}
}

export default new MenuController();
