import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import GetData from "../../Service/GetData";
import Status from "../../Service/Status";
import { IUserFunctions } from "../../interface/User/User";
import User from "../../models/UserModel";
import { AuthMiddleware } from "./AuthMiddleware";

async function UserAuthMiddleware(
	req: Request & { user?: IUserFunctions },
	res: Response,
	next: NextFunction
) {
	try {
		const userAccount = (await AuthMiddleware(req, User)) as IUserFunctions;

		req.user = userAccount;

		return next();
	} catch (err: any) {
		// TODO Сделать отдельный метод под catch
		if (err.message === ERROR_MESSAGES.UN_AUTHORIZED) {
			return Status.unauthorized(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		if (err.message === ERROR_MESSAGES.INVALID_TOKEN) {
			return Status.unauthorized(res, ERROR_MESSAGES.INVALID_TOKEN);
		}

		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}
}

export { UserAuthMiddleware };
