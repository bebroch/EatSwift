import ERROR_MESSAGES from "../../Message/Errors";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import GetData from "../../Service/GetData";
import { ICourierModel } from "../../interface/Courier";
import { IRestaurantModel } from "../../interface/Restaurant";
import { IUserModel } from "../../interface/User";
import { Request } from "express";

export async function AuthMiddleware(
	req: Request,
	model: IUserModel | IRestaurantModel | ICourierModel
) {
	const token = GetData.Token.get(req);

	if (!token) ExceptionErrorService.handler(ERROR_MESSAGES.UN_AUTHORIZED);

	try {
		const account = await model.findAccountByToken(token as string);

		if (!account)
			ExceptionErrorService.handler(ERROR_MESSAGES.UN_AUTHORIZED);

		return account;
	} catch (err) {
		ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_TOKEN);
	}
}
