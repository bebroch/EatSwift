import mongoose from "mongoose";

import Dish from "../Dish";
import {
	IDishDataForFindOne,
	IDishDataForCreate,
	IDishDataForDelete,
} from "../../interface/Restaurant/DIsh/DishTypes";

export function DishMethods(schema: mongoose.Schema) {
	schema.methods.getDishes = async function () {
		return await Dish.getDishes({ restaurant_id: this._id });
	};

	schema.methods.getDish = async function (dishData: IDishDataForFindOne) {
		return await Dish.getDish({
			_id: dishData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createDish = async function (dishData: IDishDataForCreate) {
		dishData.restaurant_id = this._id;
		return await Dish.createDish(dishData);
	};

	schema.methods.deleteDish = async function (dishData: IDishDataForDelete) {
		dishData.restaurant_id = this._id;
		await Dish.deleteDish(dishData);
	};
}
