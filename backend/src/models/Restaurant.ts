import mongoose, { Document, Model } from "mongoose";

interface IRestaurant extends Document {
	name: string;
	email: string;
	description: string;
	address: string;
	contactInfo: string;
	rating: string;
	password: string;
	verified: boolean;
}

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
