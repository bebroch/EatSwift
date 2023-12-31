import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Service/Status";
import { TAccount } from "../../../interface/Account/Account";
import GetData from "../../../Service/GetData";
import ValidateService from "../../../Service/ValidateService";

async function error(res: Response, error: any) {
	return Status.badRequest(res, error);
}

async function loginValidation(
	req: Request & {
		account?: TAccount | null;
	},
	res: Response,
	next: NextFunction
) {
	const loginData = GetData.Auth.Login.get(req);

	if (!ValidateService.Login.isRoleExist(loginData))
		return error(res, ERROR_MESSAGES.INVALID_ROLE);

	if (ValidateService.Login.checkMissingFields(loginData))
		return error(res, ERROR_MESSAGES.LOGIN_OR_PASSWORD_REQUIRED);

	const account = await ValidateService.Login.checkAccountExist(loginData);

	if (!account) return Status.notFound(res, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

	req.account = account;

	return next();
}

export default loginValidation;
