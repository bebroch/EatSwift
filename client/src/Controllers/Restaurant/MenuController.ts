import { Request, Response } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import DataFormatterRestaurant from "../../Services/DatabaseServices/Data/Formatter/Restaurant/DataFormatterRestaurant";
import getMenuFromRequest from "../../Services/Internet/GetBody/Restaurant/getMenu";
import {
	getMenuDataForAddDishToMenu,
	getMenuDataForCreate,
	getMenuDataForDelete,
} from "../../Services/Internet/GetBody/Restaurant/getMenuData";
import {
	getRestaurantFromAccount,
	getRestaurantFromParams,
} from "../../Services/Internet/GetBody/Restaurant/getRestaurant";
import Status from "../../Services/Internet/Status";
import { TAccount } from "../../interface/Account/Account";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import {
	getMenuWithDishDetails,
	getMenusWithDishDetails,
} from "../../Services/DatabaseServices/Data/getWithDetails/Menu/getMenuWithDishDetails";

class MenuController {
	async getMenusFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromParams(req)) as IRestaurant;
		return Status.success(res, restaurant.menu);
	}

	async getMenuFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromParams(
			req
		)) as IRestaurantFunctions;
		const menu = await getMenuFromRequest(req, restaurant);
		return Status.success(res, menu);
	}

	async getMenusFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;
		const menu = await restaurant.getMenus();
		const menusWithDishData = await getMenusWithDishDetails(menu);
		const formattedMenu =
			DataFormatterRestaurant.getMenuData(menusWithDishData);

		return Status.success(res, formattedMenu);
	}

	async getMenuFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;
		const menu = await getMenuFromRequest(req, restaurant);

		if (!menu) {
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);
		}

		const menuWithDishData = await getMenuWithDishDetails(menu);
		const formattedMenu =
			DataFormatterRestaurant.getMenuData(menuWithDishData); // 1
		return Status.success(res, formattedMenu);
	}

	async createMenu(req: Request & { account?: TAccount }, res: Response) {
		const menuDataForCreate = await getMenuDataForCreate(req);
		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;

		const menu = await restaurant.createMenu(menuDataForCreate);

		if (!menu) {
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_CREATED);
		}

		const formattedMenuData = DataFormatterRestaurant.getMenuData(menu);

		return Status.success(res, { menu: formattedMenuData });
	}

	async deleteMenu(req: Request, res: Response) {
		const menuData = await getMenuDataForDelete(req);

		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;

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

	async updateMenu(req: Request, res: Response) {
		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;
		const menuData = getMenuDataForAddDishToMenu(req);
		const menu = await restaurant.addDishToMenu(menuData);
		return Status.success(res, menu);
	}
}

export default new MenuController();
