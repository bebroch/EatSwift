import mongoose, { Document, Model, ObjectId } from "mongoose";
import IMenu from "../interface/Menu";

const MenuSchema = new mongoose.Schema(
	{
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Restaurant",
		},
		name: { type: String, required: true },
		description: { type: String, required: true },
		dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

const Menu: Model<IMenu> = mongoose.model<IMenu>("Menu", MenuSchema);

export default Menu;
