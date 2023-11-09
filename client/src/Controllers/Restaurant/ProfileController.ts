import { Request, Response } from "express";
import Status from "../../ServiceNew/Status";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import GetData from "../../ServiceNew/GetData";
import DataFormatter from "../../ServiceNew/DataFormatter";

class ProfileController {
	async getProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const restaurantData = await restaurant.getRestaurantData();

		const restaurantFormattedData =
			DataFormatter.Restaurant.get(restaurantData);

		return Status.success(res, { account: restaurantFormattedData });
	}

	// TODO: Сделать обновление профиля
	async updateProfile(req: Request, res: Response) {}

	// TODO: Сделать удаление профиля
	async deleteProfile(req: Request, res: Response) {}
}

export default new ProfileController(); // 1
