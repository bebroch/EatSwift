import mongoose, { ObjectId } from "mongoose";
import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindMany,
	IDishDataForFindOne,
} from "../../interface/Restaurant/Dish";
import Dish from "../Dish";

export function DishMethods(schema: mongoose.Schema) {
	schema.methods.getDishes = async function () {
		return await Dish.find({ restaurant_id: this._id });
	};

	schema.methods.getDish = async function (dishData: IDishDataForFindOne) {
		const { _id, restaurant_id } = dishData;
		return await this.find({ _id, restaurant_id });
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
