import mongoose from "mongoose";
import {
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindOne,
} from "../../interface/Restaurant/Menu";
import Menu from "../Menu";

export function MenuMethods(schema: mongoose.Schema) {
	schema.methods.getMenus = async function () {
		return await Menu.getMenus({ restaurant_id: this._id });
	};

	schema.methods.getMenu = async function (menuData: IMenuDataForFindOne) {
		return await Menu.getMenu({
			_id: menuData._id,
			restaurant_id: this._id,
		});
	};

	schema.methods.createMenu = async function (menuData: IMenuDataForCreate) {
		menuData.restaurant_id = this._id;
		return await Menu.createMenu(menuData);
	};

	schema.methods.deleteMenu = async function (menuData: IMenuDataForDelete) {
		menuData.restaurant_id = this._id;
		await Menu.deleteMenu(menuData);
	};
}
