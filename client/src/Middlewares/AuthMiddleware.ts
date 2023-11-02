import { NextFunction, Request, Response } from "express";
import ERROR_MESSAGES from "../Message/Errors";
import { getToken } from "../Services/getBody";
import Status from "../Services/Status";
import { TAccount } from "../interface/Account/Account";
import { getAccountWithToken } from "../Services/DatabaseServices/AccountService";

async function AuthMiddleware(
	req: Request & { account?: TAccount; login?: string },
	res: Response,
	next: NextFunction
) {
	const token = await getToken(req);
	req.login = req.params.login;

	if (!token) {
		return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
	}

	try {
		const account = await getAccountWithToken(token);

		if (!account) {
			return Status.unauthorized(res, ERROR_MESSAGES.UN_AUTHORIZED);
		}

		req.account = account;
	} catch (err) {
		return Status.unauthorized(res, ERROR_MESSAGES.INVALID_TOKEN);
	}

	return next();
}

export { AuthMiddleware };
