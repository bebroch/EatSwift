import mongoose from "mongoose";
import { AccountMethods } from "./Account";
import { DishMethods } from "./Dish";
import { MenuMethods } from "./Menu";

export function RestaurantMethods(schema: mongoose.Schema) {
	AccountMethods(schema);
	MenuMethods(schema);
	DishMethods(schema);
}
