import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../ServiceNew/Status";
import ValidateService from "../../../ServiceNew/ValidateService";
import GetData from "../../../ServiceNew/GetData";

async function error(res: Response, message: string) {
	return Status.badRequest(res, message);
}

async function registerValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const registerData = GetData.Auth.Registration.get(req);

	if (!ValidateService.Registration.checkRoleExist(registerData)) {
		return error(res, ERROR_MESSAGES.INVALID_ROLE);
	}

	if (ValidateService.Registration.checkMissingFields(registerData)) {
		return error(res, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
	}

	if (ValidateService.Registration.checkConfirmPassword(registerData)) {
		return error(res, ERROR_MESSAGES.PASSWORD_MISMATCH);
	}

	if (await ValidateService.Registration.checkAccountExist(registerData)) {
		return error(res, ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS);
	}

	return next();
}

export default registerValidation;
