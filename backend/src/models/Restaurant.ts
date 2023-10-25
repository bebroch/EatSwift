import mongoose, { Model } from "mongoose";
import IRestaurant from "../interface/Restaurant";

const RestaurantSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	description: { type: String, required: false },
	address: { type: String, required: false },
	contactInfo: { type: String, required: false },
	rating: { type: String, required: true },
	password: { type: String, required: true },
	verified: { type: Boolean, required: false },
});

const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
