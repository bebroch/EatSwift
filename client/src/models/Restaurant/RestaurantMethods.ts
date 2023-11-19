import mongoose from "mongoose";
import { AccountMethods } from "./Account";
import { DishMethods } from "./Dish";
import { MenuMethods } from "./Menu";
import { DataMethods } from "./Data";
import { OrderMethods } from "./OrderMethods";

export function RestaurantMethods(schema: mongoose.Schema) {
	AccountMethods(schema);
	DataMethods(schema);
	MenuMethods(schema);
	DishMethods(schema);
	OrderMethods(schema);
}
