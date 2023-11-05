import mongoose, { ObjectId } from "mongoose";
import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindMany,
	IDishDataForFindOne,
} from "../../interface/Restaurant/Dish";
import Dish from "../Dish";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		return {
			...this._doc,
			menu: await this.getMenus(),
		};
	};
}
