import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import Status from "../../Service/Status";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import GetData from "../../Service/GetData";
import Restaurant from "../../models/RestaurantModel";
import { AuthMiddleware } from "./AuthMiddleware";
import ExceptionService from "../../Service/ExceptionService";

async function RestaurantAuthMiddleware(
	req: Request & { restaurant?: IRestaurantFunctions },
	res: Response,
	next: NextFunction
) {
	try {
		const restaurantAccount = (await AuthMiddleware(
			req,
			Restaurant
		)) as IRestaurantFunctions;

		req.restaurant = restaurantAccount;

		return next();
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

export { RestaurantAuthMiddleware };
