import ERROR_MESSAGES from "../../Message/Errors";
import GetData from "../../Service/GetData";
import { ICourierModel } from "../../interface/Courier/Courier";
import { IRestaurantModel } from "../../interface/Restaurant/Restaurant";
import { IUserModel } from "../../interface/User/User";
import { Request } from "express";

export async function AuthMiddleware(
	req: Request,
	model: IUserModel | IRestaurantModel | ICourierModel
) {
	const token = GetData.Token.get(req);

	if (!token) {
		throw new Error(ERROR_MESSAGES.UN_AUTHORIZED);
	}

	try {
		const account = await model.findAccountByToken(token);

		if (!account) {
			throw new Error(ERROR_MESSAGES.UN_AUTHORIZED);
		}

		return account;
	} catch (err) {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}
}
