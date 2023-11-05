import mongoose from "mongoose";
import {
	IMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindMany,
	IMenuDataForFindOne,
	IMenuModel,
} from "../interface/Restaurant/Menu";

const MenuSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	restaurant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
		required: true,
	},
});

MenuSchema.statics.getMenus = async function (menuData: IMenuDataForFindMany) {
	const { restaurant_id } = menuData;
	const menus = await this.find({ restaurant_id });
	return menus;
};

MenuSchema.statics.getMenu = async function (menuData: IMenuDataForFindOne) {
	const { _id, restaurant_id } = menuData;
	const menu = this.findOne({ _id, restaurant_id });
	return menu;
};

MenuSchema.statics.createMenu = async function (menuData: IMenuDataForCreate) {
	const menu = new this(menuData);
	return menu.save();
};

MenuSchema.statics.deleteMenu = async function (menuData: IMenuDataForDelete) {
	const { _id, restaurant_id } = menuData;
	this.find({ restaurant_id, _id }).remove();
};

const Menu = mongoose.model<IMenu, IMenuModel>("Menu", MenuSchema);

export default Menu;
