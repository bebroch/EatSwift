import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [String], required: true },
	picture: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default DishSchema;