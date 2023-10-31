import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Services/Status";

async function error(res: Response, message: string) {
	return Status.badRequest(res, message);
}

async function loginValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { login, password } = req.body;

	if (!login || !password) {
		return error(res, ERROR_MESSAGES.LOGIN_OR_PASSWORD_REQUIRED);
	}

	return next();
}

export default loginValidation;
