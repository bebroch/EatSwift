import mongoose, { ObjectId } from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import Dish from "../DishModel";
import { MenuTypes } from "../../Types/MenuTypes";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import Log from "../../Service/Log";

export function MenuMethods(schema: mongoose.Schema) {
	schema.statics.getMenus = async function (
		menuData: MenuTypes.GetDataForFindMany
	) {
		Log.infoStack("Menu.getMenus");
		const { restaurant_id } = menuData;
		const menus = await this.find({ restaurant_id });
		return menus;
	};

	schema.statics.getMenu = async function (
		menuData: MenuTypes.GetDataForFindOne
	) {
		Log.infoStack("Menu.getMenu");
		const { _id, restaurant_id } = menuData;
		const menu = await this.findOne({ _id, restaurant_id });
		return menu;
	};

	schema.statics.createMenu = async function (
		menuData: MenuTypes.GetDataForCreate
	) {
		Log.infoStack("Menu.createMenu");
		const menu = new this(menuData);
		return menu.save();
	};

	schema.statics.deleteMenu = async function (
		menuData: MenuTypes.GetDataForDelete
	) {
		Log.infoStack("Menu.deleteMenu");
		const { _id, restaurant_id } = menuData;
		await this.findOneAndDelete({ restaurant_id, _id });
	};

	schema.statics.addDishToMenu = async function (
		menuData: MenuTypes.GetDataForAddToMenu
	) {
		Log.infoStack("Menu.addDishToMenu");
		const { dish_id, menu_id } = menuData;

		const dish = await Dish.findOne({ _id: dish_id });
		if (!dish) ExceptionErrorService.handler(ERROR_MESSAGES.DISH_NOT_FOUND);

		const menu = await this.findOne({ _id: menu_id });
		if (!menu) ExceptionErrorService.handler(ERROR_MESSAGES.MENU_NOT_FOUND);

		menu.dish.push(dish._id);

		return menu.save();
	};
}
