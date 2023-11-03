import { Request, Response } from "express";

class DishController {
	async getDishes(req: Request, res: Response) {}

	async getDish(req: Request, res: Response) {}

	async createDish(req: Request, res: Response) {}

	async deleteDish(req: Request, res: Response) {}
}

export default new DishController();
