import mongoose from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import Menu from "../MenuModel";
import { DishTypes } from "../../Types/DishTypes";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";

export function DishMethods(schema: mongoose.Schema) {
	schema.statics.getDishes = async function (
		dishData: DishTypes.GetDataForFindMany
	) {
		Log.infoStack("Order.getDishes");
		const { restaurant_id } = dishData;
		const dishes = this.find({ restaurant_id });
		return dishes;
	};

	schema.statics.getDish = async function (
		dishData: DishTypes.GetDataForFindOne
	) {
		Log.infoStack("Order.getDish");
		const { _id, restaurant_id } = dishData;
		const dish = this.findOne({ _id, restaurant_id });
		return dish;
	};

	schema.statics.createDish = async function (
		dishData: DishTypes.GetDataForCreate
	) {
		Log.infoStack("Order.createDish");
		const dish = new this(dishData);
		return dish.save();
	};

	schema.statics.deleteDish = async function (
		dishData: DishTypes.GetDataForDelete
	) {
		Log.infoStack("Order.deleteDish");
		const { _id, restaurant_id } = dishData;
		const dish = await this.findOne({ _id, restaurant_id });

		if (!dish) ExceptionErrorService.handler(ERROR_MESSAGES.DISH_NOT_FOUND);

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
