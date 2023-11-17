import mongoose from "mongoose";
import Menu from "../MenuModel";
import { MenuTypes } from "../../Types/MenuTypes";
import Log from "../../Service/Log";

export function MenuMethods(schema: mongoose.Schema) {
	schema.methods.getMenus = async function () {
		Log.infoStack("Restaurant.getMenus");
		return await Menu.getMenus({ restaurant_id: this._id });
	};

	schema.methods.getMenu = async function (
		menuData: MenuTypes.GetDataForFindOne
	) {
		Log.infoStack("Restaurant.getMenu");
		return await Menu.getMenu({
			_id: menuData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createMenu = async function (
		menuData: MenuTypes.GetDataForCreate
	) {
		Log.infoStack("Restaurant.createMenu");
		menuData.restaurant_id = this._id;
		return await Menu.createMenu(menuData);
	};

	schema.methods.deleteMenu = async function (
		menuData: MenuTypes.GetDataForDelete
	) {
		Log.infoStack("Restaurant.deleteMenu");
		menuData.restaurant_id = this._id;
		await Menu.deleteMenu(menuData);
	};

	schema.methods.addDishToMenu = async function (
		menuData: MenuTypes.GetDataForAddToMenu
	) {
		Log.infoStack("Restaurant.addDishToMenu");
		return await Menu.addDishToMenu(menuData);
	};
}
