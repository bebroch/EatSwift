import mongoose from "mongoose";
import Menu from "../MenuModel";
import { MenuTypes } from "../../Types/MenuTypes";

export function MenuMethods(schema: mongoose.Schema) {
	schema.methods.getMenus = async function () {
		return await Menu.getMenus({ restaurant_id: this._id });
	};

	schema.methods.getMenu = async function (
		menuData: MenuTypes.GetDataForFindOne
	) {
		return await Menu.getMenu({
			_id: menuData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createMenu = async function (
		menuData: MenuTypes.GetDataForCreate
	) {
		menuData.restaurant_id = this._id;
		return await Menu.createMenu(menuData);
	};

	schema.methods.deleteMenu = async function (
		menuData: MenuTypes.GetDataForDelete
	) {
		menuData.restaurant_id = this._id;
		await Menu.deleteMenu(menuData);
	};

	schema.methods.addDishToMenu = async function (
		menuData: MenuTypes.GetDataForAddToMenu
	) {
		return await Menu.addDishToMenu(menuData);
	};
}
