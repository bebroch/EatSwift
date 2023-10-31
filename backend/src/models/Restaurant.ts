import mongoose from "mongoose";
import { IRestaurant, IRestaurantModel } from "../interface/Restaurant";

const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		login: { type: String, required: true },
		email: { type: String, required: true },
		description: { type: String, required: false },
		address: [{ type: String, required: false }],
		contactInfo: { type: String, required: false },
		rating: { type: Number, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

RestaurantSchema.statics.createRestaurant = async function (
	restaurantData: IRestaurant
) {
	const restaurant = new this(restaurantData);
	return restaurant.save();
};

RestaurantSchema.statics.findRestaurantByLogin = async function (
	login: string
) {
	return this.findOne({ login });
};

RestaurantSchema.statics.findRestaurantByEmail = async function (
	email: string
) {
	return this.findOne({ email });
};

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
