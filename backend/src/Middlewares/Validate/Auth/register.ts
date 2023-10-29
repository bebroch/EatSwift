import { Request, Response, NextFunction } from "express";
import User from "../../../models/User";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Services/Status";

async function error(res: Response, message: string) {
	return Status.badRequest(res, message);
}

async function registerValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { login, email, password, confirmPassword } = req.body;

	if (!login || !email || !password || !confirmPassword) {
		return error(res, ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
	}

	if (password !== confirmPassword) {
		return error(res, ERROR_MESSAGES.PASSWORD_MISMATCH);
	}

	if (
		(await User.findUserByLogin(login)) &&
		(await User.findUserByEmail(email))
	) {
		return error(res, ERROR_MESSAGES.USER_ALREADY_EXISTS);
	}

	return next();
}

export default registerValidation;
