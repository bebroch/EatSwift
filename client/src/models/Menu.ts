import mongoose from "mongoose";
import { IMenu } from "../interface/Restaurant/Menu";

const MenuSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		dish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

MenuSchema.statics.createMenu = async function (menuData: IMenu) {

	const { name, description } = menuData;

	const menu = new this({ name, description });

	return menu.save();
};

// const Menu = mongoose.model<IMenu, IMenuModel>("Menu", MenuSchema);

export default MenuSchema;
