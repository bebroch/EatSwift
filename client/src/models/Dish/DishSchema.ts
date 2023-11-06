import mongoose from "mongoose";
import { DishMethods } from "./DishMethods";

const DishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [String], required: true },
	picture: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

DishMethods(DishSchema);

export default DishSchema;
