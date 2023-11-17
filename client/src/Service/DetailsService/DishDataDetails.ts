import { ObjectId } from "mongoose";
import Dish from "../../models/DishModel";

export const DishDataDetails = {
	async get(dish_id: ObjectId) {
		const dish = await Dish.findById(dish_id).lean();
		if (!dish) return null;
		return dish;
	},

	async getMany(dishes: ObjectId[]) {
		const dishData = await Promise.all(
			dishes.map(async dish_id => {
				return this.get(dish_id);
			})
		);

		return dishData;
	},
};
