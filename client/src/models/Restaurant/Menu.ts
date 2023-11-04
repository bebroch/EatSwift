import mongoose from "mongoose";
import {
	IMenuDataForCreate,
	IMenuDataForDelete,
} from "../../interface/Restaurant/Menu";
import Menu from "../Menu";

export function MenuMethods(schema: mongoose.Schema) {
	schema.methods.getMenus = async function () {
		return await this.menu;
	};

	schema.methods.getMenu = async function (id: string) {
		return await this.menu.findById(id);
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
