import mongoose from "mongoose";
import {
	IRestaurant,
	IRestaurantModel,
} from "../interface/Restaurant/Restaurant";
import RestaurantSchema from "./Restaurant/RestaurantSchema";

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
