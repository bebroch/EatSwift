import mongoose, { Document, Model, ObjectId } from "mongoose";
import { IMenu, IRestaurant } from "../interface/Menu";

const MenuSchema = new mongoose.Schema(
	{
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Restaurant",
		},
		name: { type: String, required: true },
		description: { type: String, required: true }
	},
	{ timestamps: true }
);

MenuSchema.statics.createMenu = async function (menuData: IMenu) {
	const menu = new this(menuData);
	return menu.save();
};

const Menu = mongoose.model<IMenu, IRestaurant>("Menu", MenuSchema);

export default Menu;
