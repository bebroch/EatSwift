import { Request, Response } from "express";
import Status from "../../ServiceNew/Status";
import Restaurant from "../../models/RestaurantModel";
import ERROR_MESSAGES from "../../Message/Errors";
import DataFormatterRestaurant from "../../Services/DatabaseServices/Data/Formatter/Restaurant/DataFormatterRestaurant";
import GetData from "../../ServiceNew/GetData";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		const restaurants = await Restaurant.find().sort({ name: 1 });

		const restaurantsData =
			DataFormatterRestaurant.getRestaurantData(restaurants);

		Status.success(res, { restaurant: restaurantsData });
	}

	async getRestaurant(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(req);

		if (!restaurant) {
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const restaurantData = await restaurant.getRestaurantData();

		const restaurantFormattedData =
			DataFormatterRestaurant.getRestaurantData(restaurantData);

		Status.success(res, { restaurant: restaurantFormattedData });
	}
}

export default new RestaurantController();
