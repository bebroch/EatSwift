import { Request, Response } from "express";
import Status from "../../ServiceNew/Status";
import Restaurant from "../../models/RestaurantModel";
import ERROR_MESSAGES from "../../Message/Errors";
import GetData from "../../ServiceNew/GetData";
import DataFormatter from "../../ServiceNew/DataFormatter";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		const restaurants = await Restaurant.find().sort({ name: 1 });

		const restaurantsData =
			DataFormatter.Restaurant.get(restaurants);

		Status.success(res, { restaurant: restaurantsData });
	}

	async getRestaurant(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(req);

		if (!restaurant) {
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const restaurantData = await restaurant.getRestaurantData();

		const restaurantFormattedData =
			DataFormatter.Restaurant.get(restaurantData);

		Status.success(res, { restaurant: restaurantFormattedData });
	}
}

export default new RestaurantController();
