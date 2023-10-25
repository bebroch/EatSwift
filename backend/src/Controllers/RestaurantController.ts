import { Request, Response } from "express";

class RestaurantController {
	async index(req: Request, res: Response) {
		return res.status(200).send({
			message: "RestaurantController",
		});
	}
}

export default new RestaurantController();
