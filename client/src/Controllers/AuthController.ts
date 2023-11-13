import { Request, Response } from "express";
import Status from "../Service/Status";
import ERROR_MESSAGES from "../Message/Errors";
import LoginService from "../Service/AuthService/LoginService";
import GetData from "../Service/GetData";
import RegistrationService from "../Service/AuthService/RegistrationService";

class AuthController {
	async login(req: Request, res: Response) {
		const loginData = GetData.Auth.Login.get(req);

		if (!loginData)
			return Status.badRequest(res, ERROR_MESSAGES.INVALID_LOGIN_DATA);

		try {
			const auth = await LoginService.Login(loginData);
			return Status.success(res, auth);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.INVALID_ROLE)
				return Status.badRequest(res, ERROR_MESSAGES.INVALID_ROLE);
			console.log("Ошибка: ", err.message);
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
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
			const auth = await RegistrationService.Registration(registerData);
			return Status.success(res, auth);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS)
				return Status.badRequest(
					res,
					ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS
				);
			console.log("Ошибка: ", err.message);
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}
	}
}

export default new AuthController();
