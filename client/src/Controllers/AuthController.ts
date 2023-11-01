import { Request, Response } from "express";
import createAccount from "../Services/DatabaseServices/CreateAccountService";
import loginToAccount from "../Services/DatabaseServices/LoginToAccount";
import Status from "../Services/Status";
import { getLoginData, getRegisterData } from "../Services/getBody";
import ERROR_MESSAGES from "../Message/Errors";

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
