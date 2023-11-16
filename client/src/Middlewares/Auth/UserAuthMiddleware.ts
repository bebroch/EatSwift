import { Request, Response, NextFunction } from "express";
import { IUserFunctions } from "../../interface/User";
import User from "../../models/UserModel";
import { AuthMiddleware } from "./AuthMiddleware";
import ExceptionService from "../../Service/ExceptionService";

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
		return ExceptionService.handle(res, err.message);
	}
}

export { UserAuthMiddleware };
