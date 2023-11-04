import { Request, Response } from "express";

class DishController {
	// TODO Сделать показ всех Блюд
	async getDishes(req: Request, res: Response) {}

	// TODO Сделать показ одного Блюда
	async getDish(req: Request, res: Response) {}

	// TODO Сделать создание Блюда
	async createDish(req: Request, res: Response) {}

	// TODO Сделать удаление Блюда
	async deleteDish(req: Request, res: Response) {}
}

export default new DishController();
