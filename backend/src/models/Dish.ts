import mongoose, { Document, Model, ObjectId } from "mongoose";
import IDish from "../interface/Dish";


const DishSchema = new mongoose.Schema({
	menu_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Menu",
	},
	name: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [String], required: true },
	picture: { type: String, required: true },
	price: { type: Number, required: true },
});

const Dish: Model<IDish> = mongoose.model<IDish>("Dish", DishSchema);

export default Dish;
