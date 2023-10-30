import { Request, Response } from "express";
import Status from "../Services/Status";

class RestaurantController {
	async getAllRestaurant(req: Request, res: Response) {
		Status.success(res, "getAllRestaurant");
	}

	async getRestaurant(req: Request, res: Response) {
		Status.success(res, "getRestaurant");
	}
}

export default new RestaurantController();
