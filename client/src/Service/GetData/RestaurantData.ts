import { Request } from "express";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import Restaurant from "../../models/RestaurantModel";
import TokenService from "../TokenService";
import { RestaurantTypes } from "../../Types/RestaurantTypes";

export const RestaurantData = {
	getPrivate(
		req: Request & RestaurantTypes.GetPrivate
	): RestaurantTypes.outputModelOrUndefined {
		return req.restaurant;
	},
	getPublic(
		req: Request & RestaurantTypes.GetPublic
	): RestaurantTypes.outputModelOrUndefined {
		return req.publicRestaurant;
	},
};
