import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import Status from "../../Service/Status";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import GetData from "../../Service/GetData";
import Restaurant from "../../models/RestaurantModel";
import { AuthMiddleware } from "./AuthMiddleware";

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
		// TODO Сделать отдельный метод под catch
		if (err.message === ERROR_MESSAGES.UN_AUTHORIZED) {
			return Status.unauthorized(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		if (err.message === ERROR_MESSAGES.INVALID_TOKEN) {
			return Status.unauthorized(res, ERROR_MESSAGES.INVALID_TOKEN);
		}

		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}
}

export { RestaurantAuthMiddleware };
