import { ObjectId } from "mongoose";
import { IDish } from "../../interface/DishModel";
import Dish from "../../models/DishModel";

export const DishDataDetails = {
	async getMany(dishes: ObjectId[]) {
		const dishData = await Promise.all(
			dishes.map(async dish_id => {
				const dish = await Dish.findById(dish_id);
				return dish;
			})
		);

		return dishData;
	},
};
