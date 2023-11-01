import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Services/Status";
import {
	checkAccountExist,
	checkMissingFields,
} from "../../../Services/Validation/LoginValidation";
import { checkRoleExist } from "../../../Services/Validation/RegisterValidation";
import { getLoginData } from "../../../Services/getBody";
import { ICourier } from "../../../interface/Courier/Courier";
import { IRestaurant } from "../../../interface/Restaurant/Restaurant";
import { IUser } from "../../../interface/User/User";

async function error(res: Response, message: string) {
	return Status.badRequest(res, message);
}

async function loginValidation(
	req: Request & {
		account?: IUser | IRestaurant | ICourier;
	},
	res: Response,
	next: NextFunction
) {
	const loginData = await getLoginData(req);

	if (!(await checkRoleExist(loginData))) {
		return error(res, ERROR_MESSAGES.INVALID_ROLE);
	}

	if (await checkMissingFields(loginData)) {
		return error(res, ERROR_MESSAGES.LOGIN_OR_PASSWORD_REQUIRED);
	}

	const account = await checkAccountExist(loginData);

	if (!account) {
		return error(res, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
	}

	req.account = account;

	return next();
}

export default loginValidation;
