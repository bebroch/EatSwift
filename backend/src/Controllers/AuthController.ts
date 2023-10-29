import { Request, Response } from "express";
import { generateToken } from "../Services/Jwt";
import User from "../models/User";
import Status from "../Services/Status";
import ERROR_MESSAGES from "../Message/Errors";
import { hashingPassword, verifyPassword } from "../Services/Password";
import { IUser } from "../interface/User";

class AuthController {
	async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (!user) {
			return Status.notFound(res, ERROR_MESSAGES.NOT_FOUND);
		}

		const isRightPassword = await verifyPassword(password, user.password);
		if (!isRightPassword) {
			return Status.badRequest(
				res,
				ERROR_MESSAGES.INVALID_LOGIN_OR_PASSWORD
			);
		}

		const token = await generateToken(user);

		return Status.success(res, { token, user });
	}

	async register(req: Request, res: Response) {
		const { login, email, password } = req.body;

		const passwordHash = await hashingPassword(password);

		const user = (await User.createUser({
			login,
			email,
			password: passwordHash,
		})) as IUser;

		const token = await generateToken(user);

		return Status.success(res, { auth: { token, user } });
	}
}

export default new AuthController();
