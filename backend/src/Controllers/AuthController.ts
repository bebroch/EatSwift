import { Request, Response } from "express";
import { generateToken } from "../Services/Jwt";
import User from "../models/User";
import Status from "../Services/Status";
import ERROR_MESSAGES from "../Message/Errors";
import { hashingPassword, verifyPassword } from "../Services/Password";
import { IUser } from "../interface/User";
import { getRegisterData } from "../Services/getBody";
import createAccount from "../Services/DatabaseServices/CreateAccountService";

class AuthController {
	async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (!user) {
			return Status.notFound(res, ERROR_MESSAGES.NOT_FOUND);
		}

		const isRightPassword = await verifyPassword(
			password,
			user.password as string
		);
		const isRightPasswordTESTING = password === user.password; // TODO: Нужно потом будет убрать эту строчку и в if: "&& !isRightPasswordTESTING" - эту

		if (!isRightPassword && !isRightPasswordTESTING) {
			return Status.badRequest(
				res,
				ERROR_MESSAGES.INVALID_LOGIN_OR_PASSWORD
			);
		}

		const token = await generateToken(user);

		return Status.success(res, { token, user });
	}

	async register(req: Request, res: Response) {
		const registerData = await getRegisterData(req);

		const auth = await createAccount(registerData);

		return Status.success(res, { auth });
	}
}

export default new AuthController();
