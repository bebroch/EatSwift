import mongoose, { Document, Model, ObjectId } from "mongoose";
import { IMenu, IMenuModel } from "../interface/Restaurant/Menu";
import Restaurant from "./Restaurant";
import ERROR_MESSAGES from "../Message/Errors";

const MenuSchema = new mongoose.Schema(
	{
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Restaurant",
		},
		name: { type: String, required: true },
		description: { type: String, required: true },
		dish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

MenuSchema.statics.createMenu = async function (menuData: IMenu) {
	const menu = new this(menuData);
	const restaurant = await Restaurant.findById(menu.restaurant._id);

	if (!restaurant) {
		throw new Error(ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
	}

	const a = restaurant.menu.map((item: any) => {
		return item.name != menu.name && item.description != menu.description;
	});

	console.log(restaurant, a);

	restaurant.menu.push(menu);

	return menu.save();
};

const Menu = mongoose.model<IMenu, IMenuModel>("Menu", MenuSchema);

export default Menu;
