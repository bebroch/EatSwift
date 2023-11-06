import { Request, Response, NextFunction } from "express";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";
import Restaurant from "../models/Restaurant";
import Status from "../Services/Internet/Status";
import ERROR_MESSAGES from "../Message/Errors";

async function restaurantParamHandler(
	req: Request & { account?: IRestaurantFunctions },
	res: Response,
	next: NextFunction
) {
	const { login } = req.params;

	const restaurant = await Restaurant.findOne({ login });

	if (!restaurant) {
		return Status.notFound(res, ERROR_MESSAGES.RESTAURANT_NOT_FOUND);
	}

	req.account = restaurant;
	next();
}

export default restaurantParamHandler;
