import { Request, Response } from "express";
import Status from "../ServiceNew/Status";
import ERROR_MESSAGES from "../Message/Errors";
import LoginService from "../ServiceNew/AuthService/LoginService";
import GetData from "../ServiceNew/GetData";
import RegistrationService from "../ServiceNew/AuthService/RegistrationService";

class AuthController {
	async login(req: Request, res: Response) {
		const loginData = GetData.Auth.Login.get(req);

		if (!loginData)
			return Status.badRequest(res, ERROR_MESSAGES.INVALID_LOGIN_DATA);

		try {
			const auth = LoginService.Login(loginData);
			return Status.success(res, auth);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.INVALID_ROLE)
				return Status.badRequest(res, ERROR_MESSAGES.INVALID_ROLE);
			return Status.internalError(res, err.message);
		}
	}

	async register(req: Request, res: Response) {
		const registerData = GetData.Auth.Registration.get(req);

		if (!registerData) {
			return Status.badRequest(
				res,
				ERROR_MESSAGES.INVALID_REGISTRATION_DATA
			);
		}

		try {
			const auth = RegistrationService.Registration(registerData);
			return Status.success(res, auth);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS)
				return Status.badRequest(
					res,
					ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS
				);
			return Status.internalError(res, err.message);
		}
	}
}

export default new AuthController();
