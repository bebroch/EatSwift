import { Request, Response } from "express";
import { getRestaurantFromAccount } from "../../Services/Internet/GetBody/Restaurant/getRestaurant";
import Status from "../../Services/Internet/Status";
import DataFormatterRestaurant from "../../Services/DatabaseServices/Data/Formatter/DataFormatterRestaurant";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";

// TODO: Сделать аккаунт ресторану
class ProfileController {
	async getProfile(req: Request, res: Response) {
		const restaurant = getRestaurantFromAccount(
			req
		) as IRestaurantFunctions;
		const restaurantData = await restaurant.getRestaurantData();
		const restaurantFormattedData =
			DataFormatterRestaurant.getRestaurantData(restaurantData);
		return Status.success(res, { account: restaurantFormattedData });
	}

	async updateProfile(req: Request, res: Response) {}

	async deleteProfile(req: Request, res: Response) {}
}

export default new ProfileController();
