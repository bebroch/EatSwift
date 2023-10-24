import mongoose, { Document, Model, ObjectId } from "mongoose";

interface IMenu extends Document {
	restaurant_id: ObjectId;
	name: string;
	description: string;
	mealPeriod: string;
}

const MenuSchema = new mongoose.Schema({
	restaurant_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Restaurant",
	},
	name: { type: String, required: true },
	description: { type: String, required: true },
	mealPeriod: {
		type: String,
		enum: ["active", "isProcessed", "delivered", "completed", "canceled"],
		required: true,
	},
});

const Menu: Model<IMenu> = mongoose.model<IMenu>("Menu", MenuSchema);

export default Menu;
