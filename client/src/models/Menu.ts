import mongoose from "mongoose";
import {
	IMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
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
	dish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

MenuSchema.statics.createMenu = async function (menuData: IMenuDataForCreate) {
	const menu = new this(menuData);
	return menu.save();
};

MenuSchema.statics.deleteMenu = async function (menuData: IMenuDataForDelete) {
	const { _id, restaurant_id } = menuData;
	this.find({ restaurant_id, _id }).remove();
	// TODO Проверить ошибки
};

const Menu = mongoose.model<IMenu, IMenuModel>("Menu", MenuSchema);

export default Menu;
