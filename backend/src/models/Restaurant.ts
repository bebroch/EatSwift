import mongoose, { Model } from "mongoose";
import { IRestaurant, IRestaurantModel } from "../interface/Restaurant";

const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		description: { type: String, required: false },
		address: { type: String, required: false },
		contactInfo: { type: String, required: false },
		rating: { type: String, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		menu_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
		dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

RestaurantSchema.statics.createRestaurant = async function (
	restaurantData: IRestaurant
) {
	const restaurant = new this(restaurantData);
	return restaurant.save();
};

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
