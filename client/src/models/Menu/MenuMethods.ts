import mongoose, { ObjectId } from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import {
	IMenuDataForFindMany,
	IMenuDataForFindOne,
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForAddToMenu,
} from "../../interface/Restaurant/Menu/MenuTypes";
import Dish from "../Dish";
import MenuSchema from "./MenuSchema";
import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { IMenu } from "../../interface/Restaurant/Menu/MenuModel";
import { formatterDataMenu } from "../../Services/DatabaseServices/Data/Formatter/Menu";

export function MenuMethods(schema: mongoose.Schema) {
	schema.path("dish").validate(async function (value) {
		const uniqueDishIds = [...new Set(value)];
		return uniqueDishIds.length === value.length;
	}, "Dish IDs in the array must be unique.");

	schema.statics.getMenus = async function (menuData: IMenuDataForFindMany) {
		const { restaurant_id } = menuData;
		const menus = await this.find({ restaurant_id });
		return menus;
	};

	schema.statics.getMenu = async function (menuData: IMenuDataForFindOne) {
		const { _id, restaurant_id } = menuData;
		const menu = await this.findOne({ _id, restaurant_id });
		return menu;
	};

	schema.statics.createMenu = async function (menuData: IMenuDataForCreate) {
		const menu = new this(menuData);
		return menu.save();
	};

	schema.statics.deleteMenu = async function (menuData: IMenuDataForDelete) {
		const { _id, restaurant_id } = menuData;
		this.find({ restaurant_id, _id }).remove();
	};

	schema.statics.addDishToMenu = async function (
		menuData: IMenuDataForAddToMenu
	) {
		const { dish_id, menu_id } = menuData;

		const dish = await Dish.findOne({ _id: dish_id });
		if (!dish) throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);

		const menu = await this.findOne({ _id: menu_id });
		if (!menu) throw new Error(ERROR_MESSAGES.MENU_NOT_FOUND);

		menu.dish.push(dish._id);

		return menu.save();
	};
}
