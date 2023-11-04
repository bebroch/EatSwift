import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import Restaurant from "../../models/Restaurant";
import ERROR_MESSAGES from "../../Message/Errors";
import FormatterData from "../../Services/DatabaseServices/Data/DataFormatter";
import { getRestaurantFromParams } from "../../Services/Internet/GetBody/Restaurant/getRestaurant";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		const restaurants = await Restaurant.find().sort({ name: 1 });

		const restaurantsData =
			await FormatterData.getRestaurantData(restaurants);

		Status.success(res, { restaurant: restaurantsData });
	}

	async getRestaurant(req: Request, res: Response) {
		const restaurant = await getRestaurantFromParams(req);

		if (!restaurant) {
			return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
		}

		const restaurantData =
			await FormatterData.getRestaurantData(restaurant);

		Status.success(res, { restaurant: restaurantData });
	}
}

export default new RestaurantController();
