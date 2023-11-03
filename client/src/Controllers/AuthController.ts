import { Request, Response } from "express";
import createAccount from "../Services/DatabaseServices/Accounts/CreateAccountService";
import loginToAccount from "../Services/DatabaseServices/Accounts/LoginToAccount";
import Status from "../Services/Internet/Status";
import ERROR_MESSAGES from "../Message/Errors";
import getRegisterData from "../Services/Internet/GetBody/Auth/getRegisterData";
import getLoginData from "../Services/Internet/GetBody/Auth/getLoginData";

class AuthController {
	async login(req: Request, res: Response) {
		const loginData = await getLoginData(req);

		const auth = await loginToAccount(loginData);

		if (!auth) {
			return Status.badRequest(
				res,
				ERROR_MESSAGES.INVALID_LOGIN_OR_PASSWORD
			);
		}

		return Status.success(res, { auth });
	}

	async register(req: Request, res: Response) {
		const registerData = await getRegisterData(req);

		const auth = await createAccount(registerData);

		if (!auth) {
			return Status.badRequest(res, ERROR_MESSAGES.ACCOUNT_NOT_CREATED);
		}

		return Status.success(res, { auth });
	}
}

export default new AuthController();
