import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import Status from "../../Service/Status";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import GetData from "../../Service/GetData";

async function RestaurantAuthMiddleware(
	req: Request & { restaurant?: IRestaurantFunctions },
	res: Response,
	next: NextFunction
) {
	const token = GetData.Token.get(req);

	if (!token) {
		return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
	}

	try {
		const restaurantAccount = await GetData.Restaurant.getByToken(token);

		if (!restaurantAccount) {
			return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
		}

		req.restaurant = restaurantAccount;
	} catch (err) {
		return Status.unauthorized(res, ERROR_MESSAGES.INVALID_TOKEN);
	}

	return next();
}

export { RestaurantAuthMiddleware };
