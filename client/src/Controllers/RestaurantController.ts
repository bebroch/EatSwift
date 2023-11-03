import { Request, Response } from "express";
import Status from "../Services/Status";
import { TAccount } from "../interface/Account/Account";
import Restaurant from "../models/Restaurant";
import ERROR_MESSAGES from "../Message/Errors";
import ClearDataService from "../../src/Services/DatabaseServices/ClearData";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		Status.success(res, "getAllRestaurant");
	}

	async getRestaurant(req: Request & { account?: TAccount }, res: Response) {
		const { login } = req.params;
		const restaurant = await Restaurant.findOne({ login });

		if (!restaurant) {
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const restaurantData = await ClearDataService.getRestaurantData(restaurant);

		Status.success(res, { restaurant: restaurantData });
	}
}

export default new RestaurantController();
