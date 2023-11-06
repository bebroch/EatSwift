import mongoose from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import {
	IDishDataForFindMany,
	IDishDataForFindOne,
	IDishDataForCreate,
	IDishDataForDelete,
} from "../../interface/Restaurant/DIsh/DishTypes";
import DishSchema from "./DishSchema";
import Menu from "../Menu";

export function DishMethods(schema: mongoose.Schema) {
	schema.statics.getDishes = async function (dishData: IDishDataForFindMany) {
		const { restaurant_id } = dishData;
		const dishes = this.find({ restaurant_id });
		return dishes;
	};

	schema.statics.getDish = async function (dishData: IDishDataForFindOne) {
		const { _id, restaurant_id } = dishData;
		const dish = this.findOne({ _id, restaurant_id });
		return dish;
	};

	schema.statics.createDish = async function (dishData: IDishDataForCreate) {
		const dish = new this(dishData);
		return dish.save();
	};

	schema.statics.deleteDish = async function (dishData: IDishDataForDelete) {
		const { _id, restaurant_id } = dishData;
		const dish = await this.findOne({ _id, restaurant_id });

		if (!dish) throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);

		const menus = await Menu.find({ dish: dish._id });

		for (const menu of menus) {
			menu.dish = menu.dish.filter(
				dishId => dishId.toString() !== dishData._id.toString()
			);

			await menu.save();
		}

		await this.deleteOne({ _id, restaurant_id });
	};
}
