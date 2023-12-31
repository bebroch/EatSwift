import { Request } from "express";
import { DishTypes } from "../../Types/DishTypes";

export const DishData = {
	FindOne(req: Request) {
		const { _id } = req.params;
		return { _id };
	},

	Create(req: Request) {
		const { name, description, ingredients, picture, price } = req.body;
		return { name, description, ingredients, picture, price };
	},
	AddToCart(req: Request) {
		const { dish_id, restaurant_id } = req.body;
		return { dish_id, restaurant_id };
	},

	Delete(req: Request) {
		const { restaurant_id } = req.body;
		const { _id } = req.params;
		return { _id, restaurant_id };
	},

	DeleteFromCart(req: Request) {
		const { dish_id, restaurant_id } = req.body;
		return { dish_id, restaurant_id };
	},
};
