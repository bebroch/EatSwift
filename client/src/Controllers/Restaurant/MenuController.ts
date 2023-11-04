import { Request, Response } from "express";
import Menu from "../../models/Menu";
import getMenuData from "../../Services/Internet/GetBody/Restaurant/getMenuData";
import Status from "../../Services/Internet/Status";
import { getRestaurant } from "../../Services/Internet/GetBody/Restaurant/getRestaurant";
import { TAccount } from "../../interface/Account/Account";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";

class MenuController {
	async getMenus(req: Request, res: Response) {}

	async getMenu(req: Request, res: Response) {}

	async createMenu(req: Request & { account?: TAccount }, res: Response) {
		const menuData = await getMenuData(req);
		const restaurant = (await getRestaurant(req)) as IRestaurantFunctions;

		const menu = await restaurant.createMenu(menuData);

		return Status.success(res, menu);
	}

	async deleteMenu(req: Request, res: Response) {}
}

export default new MenuController();
