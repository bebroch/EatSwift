import { Request, Response, NextFunction } from "express";
import User from "../../../models/User";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Services/Status";
import {
	checkMissingFields,
	checkConfirmPassword,
	checkAccountExist,
	checkRoleExist,
} from "../../../Services/Validation/RegisterValidation";
import { getRegisterData } from "../../../Services/getBody";

async function error(res: Response, message: string) {
	return Status.badRequest(res, message);
}

async function registerValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const registerData = await getRegisterData(req);

	if (!(await checkRoleExist(registerData))) {
		return error(res, ERROR_MESSAGES.INVALID_ROLE);
	}

	if (await checkMissingFields(registerData)) {
		return error(res, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
	}

	if (await checkConfirmPassword(registerData)) {
		return error(res, ERROR_MESSAGES.PASSWORD_MISMATCH);
	}

	if (await checkAccountExist(registerData)) {
		return error(res, ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS);
	}

	return next();
}

export default registerValidation;
