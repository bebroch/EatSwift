import { Request, Response } from "express";
import Status from "../../Service/Status";
import Restaurant from "../../models/RestaurantModel";
import ERROR_MESSAGES from "../../Message/Errors";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		const restaurants = await Restaurant.find().sort({ name: 1 }); // TODO Сделать метод в модели

		const restaurantsData = DataFormatter.Restaurant.get(restaurants);

		return Status.success(res, { restaurant: restaurantsData });
	}

	async getRestaurant(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPublic(req);

		if (!restaurant) 
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		

		const restaurantData = await restaurant.getRestaurantData();

		const restaurantFormattedData =
			DataFormatter.Restaurant.get(restaurantData);

		return Status.success(res, { restaurant: restaurantFormattedData });
	}
}

export default new RestaurantController();
