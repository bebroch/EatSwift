import mongoose from "mongoose";

import Dish from "../DishModel";
import { DishTypes } from "../../Types/DishTypes";
import Log from "../../Service/Log";

export function DishMethods(schema: mongoose.Schema) {
	schema.methods.getDishes = async function () {
		Log.infoStack("Restaurant.getDishes");
		return await Dish.getDishes({ restaurant_id: this._id });
	};

	schema.methods.getDish = async function (
		dishData: DishTypes.GetDataForFindOne
	) {
		Log.infoStack("Restaurant.getDish");
		return await Dish.getDish({
			_id: dishData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createDish = async function (
		dishData: DishTypes.GetDataForCreate
	) {
		Log.infoStack("Restaurant.createDish");
		dishData.restaurant_id = this._id;
		return await Dish.createDish(dishData);
	};

	schema.methods.deleteDish = async function (
		dishData: DishTypes.GetDataForDelete
	) {
		Log.infoStack("Restaurant.deleteDish");
		dishData.restaurant_id = this._id;
		await Dish.deleteDish(dishData);
	};
}
