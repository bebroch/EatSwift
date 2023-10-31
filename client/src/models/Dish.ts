import mongoose, { Document, Model, ObjectId } from "mongoose";
import { IDish, IDishModel } from "../interface/Dish";

const DishSchema = new mongoose.Schema(
	{
		restaurant_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Restaurant",
		},
		menu_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Menu",
		},
		name: { type: String, required: true },
		description: { type: String, required: true },
		ingredients: { type: [String], required: true },
		picture: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);

DishSchema.statics.createDish = async function (dishData: IDish) {
	const dish = new this(dishData);
	return dish.save();
};

const Dish = mongoose.model<IDish, IDishModel>("Dish", DishSchema);

export default Dish;
