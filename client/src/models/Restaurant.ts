import mongoose from "mongoose";
import { IRestaurant, IRestaurantModel } from "../interface/Restaurant";
import { decodeToken } from "../Services/Jwt";

const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		description: { type: String, required: false },
		address: [{ type: String, required: false }],
		contactInfo: { type: String, required: false },
		rating: { type: Number, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

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

RestaurantSchema.statics.createRestaurant = async function (
	restaurantData: IRestaurant
) {
	const restaurant = new this(restaurantData);
	return restaurant.save();
};

RestaurantSchema.statics.findRestaurantByToken = async function (
	token: string
) {
	const restaurantData = (await decodeToken(token)) as IRestaurant;
	return await this.findOne(restaurantData);
};

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
