import { Request, Response } from "express";
import Status from "../../Service/Status";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import Log from "../../Service/Log";

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
	async updateProfile(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const updateData = GetData.Restaurant.getUpdateData(req);
		await restaurant.updateInfo(updateData);
		const restaurantData = await restaurant.getRestaurantData();
		const restaurantDataFormatted =
			DataFormatter.Restaurant.get(restaurantData);
		return Status.success(res, { account: restaurantDataFormatted });
	}

	// TODO: Сделать удаление профиля
	async deleteProfile(req: Request, res: Response) {
		Log.info("HELLO");
	}
}

export default new ProfileController();
