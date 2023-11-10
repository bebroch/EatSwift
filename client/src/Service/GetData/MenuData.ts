import { Request } from "express";

export const MenuData = {
	FindOne(req: Request) {
		const { _id } = req.params;
		return { _id };
	},
	Create(req: Request) {
		const { name, description } = req.body;
		return { name, description };
	},
	Delete(req: Request) {
		const { _id } = req.params;
		return { _id };
	},

	AddDishToMenu(req: Request) {
		const { dish_id } = req.body;
		const { menu_id } = req.params;
		return { dish_id, menu_id };
	},
};
