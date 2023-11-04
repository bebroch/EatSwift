import mongoose, { ObjectId } from "mongoose";
import {
	IDish,
	IDishDataForCreate,
	IDishDataForDelete,
	IDishModel,
} from "../interface/Restaurant/Dish";

const DishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [String], required: true },
	picture: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

DishSchema.statics.createDish = async function (dishData: IDishDataForCreate) {
	const dish = new this(dishData);
	return dish.save();
};

DishSchema.statics.deleteDish = async function (dishData: IDishDataForDelete) {
	const { _id, restaurant_id } = dishData;
	this.find({ restaurant_id, _id }).remove();
	// TODO Проверить ошибки
};

const Dish = mongoose.model<IDish, IDishModel>("Dish", DishSchema);

export default Dish;
