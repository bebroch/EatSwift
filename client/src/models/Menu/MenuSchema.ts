import mongoose from "mongoose";
import { MenuMethods } from "./MenuMethods";

const MenuSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	restaurant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Restaurant",
		required: true,
	},
	dish: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dish",
		},
	],
});

MenuMethods(MenuSchema);

export default MenuSchema;
