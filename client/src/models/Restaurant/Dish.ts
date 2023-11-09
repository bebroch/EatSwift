import mongoose from "mongoose";

import Dish from "../DishModel";
import { DishTypes } from "../../Types/DishTypes";

export function DishMethods(schema: mongoose.Schema) {
	schema.methods.getDishes = async function () {
		return await Dish.getDishes({ restaurant_id: this._id });
	};

	schema.methods.getDish = async function (
		dishData: DishTypes.GetDataForFindOne
	) {
		return await Dish.getDish({
			_id: dishData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createDish = async function (
		dishData: DishTypes.GetDataForCreate
	) {
		dishData.restaurant_id = this._id;
		return await Dish.createDish(dishData);
	};

	schema.methods.deleteDish = async function (
		dishData: DishTypes.GetDataForDelete
	) {
		dishData.restaurant_id = this._id;
		await Dish.deleteDish(dishData);
	};
}
