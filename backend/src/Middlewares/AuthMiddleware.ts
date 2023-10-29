import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../Message/Errors";
import { getToken } from "../Services/getBody";
import User from "../models/User";
import Status from "../Services/Status";

async function AuthMiddleware(
	req: Request & { user?: any },
	res: Response,
	next: NextFunction
) {
	const token = await getToken(req);

	try {
		const user = await User.findUserWithToken(token);

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
