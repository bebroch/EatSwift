import { Request, Response } from "express";
import Status from "../Service/Status";
import ERROR_MESSAGES from "../Message/Errors";
import LoginService from "../Service/AuthService/LoginService";
import GetData from "../Service/GetData";
import RegistrationService from "../Service/AuthService/RegistrationService";
import ExceptionService from "../Service/ExceptionService";
import DataFormatter from "../Service/DataFormatter";

class AuthController {
	async login(req: Request, res: Response) {
		const loginData = GetData.Auth.Login.get(req);

		if (!loginData)
			return Status.badRequest(res, ERROR_MESSAGES.INVALID_LOGIN_DATA);

		try {
			const auth = await LoginService.Login(loginData);
			const authDataFormatted = DataFormatter.Auth.Login.get(auth);
			return Status.success(res, authDataFormatted);
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
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
			const authDataFormatted = DataFormatter.Auth.Registration.get(auth);
			return Status.success(res, authDataFormatted);
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
		}
	}
}

export default new AuthController(); 
