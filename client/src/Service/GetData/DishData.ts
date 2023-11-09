import { Request } from "express";
import { DishTypes } from "../../Types/DishTypes";

export const DishData = {
	FindOne(req: Request) {
		const { restaurant_id } = req.body;
		const { _id } = req.params;
		return { _id, restaurant_id };
	},

	Create(req: Request) {
		const { name, description, ingredients, picture, price } = req.body;
		return { name, description, ingredients, picture, price };
	},
	AddToCart(req: Request) {
		const { _id } = req.body;
		return { _id };
	},

	Delete(req: Request) {
		const { restaurant_id } = req.body;
		const { _id } = req.params;
		return { _id, restaurant_id };
	},

	DeleteFromCart(req: Request) {
		const { _id } = req.body;
		return { _id };
	},
};
