import { Request, Response, NextFunction } from "express";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";
import Restaurant from "../models/RestaurantModel";
import Status from "../ServiceNew/Status";
import ERROR_MESSAGES from "../Message/Errors";

async function restaurantParamHandler(
	req: Request & { publicRestaurant?: IRestaurantFunctions },
	res: Response,
	next: NextFunction
) {
	const { login } = req.params;

	const restaurant = await Restaurant.findOne({ login });

	if (!restaurant) {
		return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
	}

	req.publicRestaurant = restaurant;
	next();
}

export default restaurantParamHandler;
