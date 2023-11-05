import mongoose from "mongoose";
import {
	IDish,
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindMany,
	IDishDataForFindOne,
	IDishModel,
} from "../interface/Restaurant/Dish";
import ERROR_MESSAGES from "../Message/Errors";

const DishSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	ingredients: { type: [String], required: true },
	picture: { type: String, required: true },
	price: { type: Number, required: true },
	restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

DishSchema.statics.getDishes = async function (dishData: IDishDataForFindMany) {
	const { restaurant_id } = dishData;
	const dishes = this.find({ restaurant_id });
	return dishes;
};

DishSchema.statics.getDish = async function (dishData: IDishDataForFindOne) {
	const { _id, restaurant_id } = dishData;
	const dish = this.findOne({ _id, restaurant_id });
	return dish;
};

DishSchema.statics.createDish = async function (dishData: IDishDataForCreate) {
	const dish = new this(dishData);
	return dish.save();
};

DishSchema.statics.deleteDish = async function (dishData: IDishDataForDelete) {
	const { _id, restaurant_id } = dishData;
	const dish = await this.findOne({ _id, restaurant_id });
	if (!dish) throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);

	await this.deleteOne({ _id, restaurant_id });
};

const Dish = mongoose.model<IDish, IDishModel>("Dish", DishSchema);

export default Dish;
