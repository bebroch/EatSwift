import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import Restaurant from "../../models/Restaurant";
import ERROR_MESSAGES from "../../Message/Errors";
import ClearDataService from "../../Services/DatabaseServices/Data/ClearDataService";
import getRestaurantWithItems from "../../Services/DatabaseServices/Restaurant/getRestaurantWithItems";
import { getRestaurantFromParams } from "../../Services/Internet/GetBody/Restaurant/getRestaurant";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		const restaurants = await Restaurant.find().sort({ name: 1 });

		const restaurantsData =
			await ClearDataService.getRestaurantData(restaurants);

		Status.success(res, { restaurant: restaurantsData });
	}

	async getRestaurant(req: Request, res: Response) {
		const restaurant = await getRestaurantFromParams(req);

		if (!restaurant) {
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const restaurantData =
			await ClearDataService.getRestaurantData(restaurant);

		Status.success(res, { restaurant: restaurantData });
	}
}

export default new RestaurantController();
