import { Request, Response } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import Status from "../../Service/Status";
import { TAccount } from "../../interface/Account";
import { IRestaurantFunctions } from "../../interface/Restaurant";

import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import ExceptionService from "../../Service/ExceptionService";

class MenuController {
	async getMenusFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPublic(
			req
		) as IRestaurantFunctions;

		const menu = await restaurant.getMenus();

		if (menu.length === 0)
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);

		const menuWithDetails = await DetailsService.Menu.getManyWithDish(menu);
		const menuDataFormatted = DataFormatter.Menu.get(menuWithDetails);

		return Status.success(res, menuDataFormatted);
	}

	async getMenuFromPublicRestaurantProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPublic(
			req
		) as IRestaurantFunctions;

		const menuData = GetData.Menu.FindOne(req);
		const menu = await restaurant.getMenu(menuData);

		if (!menu) return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);

		const menuWithDetails = await DetailsService.Menu.getOneWithDish(menu);
		const menuDataFormatted = DataFormatter.Menu.getOne(menuWithDetails);

		return Status.success(res, menuDataFormatted);
	}

	async getMenusFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const menu = await restaurant.getMenus();

		if (menu.length === 0)
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);

		const menusWithDishData =
			await DetailsService.Menu.getManyWithDish(menu);

		const formattedMenu = DataFormatter.Menu.get(menusWithDishData);

		return Status.success(res, formattedMenu);
	}

	async getMenuFromPrivateRestaurantProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const menuData = GetData.Menu.FindOne(req);
		const menu = await restaurant.getMenu(menuData);

		if (!menu) return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_FOUND);

		const menuWithDishData = await DetailsService.Menu.getOneWithDish(menu);
		const formattedMenu = DataFormatter.Menu.get(menuWithDishData);

		return Status.success(res, formattedMenu);
	}

	async createMenu(req: Request & { account?: TAccount }, res: Response) {
		const menuDataForCreate = GetData.Menu.Create(req);
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const menu = await restaurant.createMenu(menuDataForCreate);

		if (!menu) {
			return Status.notFound(res, ERROR_MESSAGES.MENU_NOT_CREATED);
		}

		const formattedMenuData = DataFormatter.Menu.get(menu);

		return Status.success(res, { menu: formattedMenuData });
	}

	async deleteMenu(req: Request, res: Response) {
		const menuData = GetData.Menu.Delete(req);

		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		try {
			await restaurant.deleteMenu(menuData);
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
		}

		return Status.success(
			res,
			SUCCESS_MESSAGE.MENU_SUCCESSFULLY_DELETED_FROM_RESTAURANT
		);
	}

	async updateMenu(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const menuData = GetData.Menu.AddDishToMenu(req);
		const menu = await restaurant.addDishToMenu(menuData);
		return Status.success(res, menu);
	}
}

export default new MenuController();
