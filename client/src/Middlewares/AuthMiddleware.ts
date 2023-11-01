import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../Message/Errors";
import { getToken } from "../Services/getBody";
import User from "../models/User";
import Status from "../Services/Status";

// TOD: Редактировать
async function AuthMiddleware(
	req: Request & { user?: any; login?: string },
	res: Response,
	next: NextFunction
) {
	const token = await getToken(req);
	req.login = req.params.login;

	if (!token) {
		return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
	}

	try {
		const user = await User.findAccountWithToken(token);

		if (!user) {
			return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
		}

		req.user = user;
	} catch (err) {
		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}

	return next();
}

export { AuthMiddleware };
