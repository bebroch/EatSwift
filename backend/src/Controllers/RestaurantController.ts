import { Request, Response } from "express";
import Status from "../Services/Status";

class RestaurantController {
	async index(req: Request, res: Response) {
		Status.success(res, "RestaurantController");
	}
}

export default new RestaurantController();
