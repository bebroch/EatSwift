import mongoose from "mongoose";
import {
	IDishDataForCreate,
	IDishDataForDelete,
} from "../../interface/Restaurant/Dish";
import Dish from "../Dish";

export function DishMethods(schema: mongoose.Schema) {
	schema.methods.getDishes = async function (id: string) {
		return await this.findById(id);
	};

	schema.methods.getDish = async function (id: string) {
		return await this.findById(id);
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
