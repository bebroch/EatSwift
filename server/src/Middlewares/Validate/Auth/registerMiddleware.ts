import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Service/Status";
import ValidateService from "../../../Service/ValidateService";
import GetData from "../../../Service/GetData";

async function error(res: Response, error: any) {
	return Status.badRequest(res, error);
}

async function registerValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const registerData = GetData.Auth.Registration.get(req);

	if (!ValidateService.Registration.checkRoleExist(registerData))
		return error(res, ERROR_MESSAGES.INVALID_ROLE);

	if (ValidateService.Registration.checkMissingFields(registerData))
		return error(res, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);

	if (ValidateService.Registration.checkConfirmPassword(registerData))
		return error(res, ERROR_MESSAGES.PASSWORD_MISMATCH);

	if (await ValidateService.Registration.checkAccountExist(registerData))
		return error(res, ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS);

	return next();
}

export default registerValidation;
