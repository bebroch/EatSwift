import { Request, Response } from "express";
import { decodeToken, generateToken } from "../Services/Jwt";
import User from "../models/User";
import Status from "../Services/Status";
import { getToken } from "../Services/getBody";
import ERROR_MESSAGES from "../Message/Errors";
import { IUser } from "../interface/User";

class AuthController {
	async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = User.findOne({ login });

		if (!user) {
			return Status.notFound(res, ERROR_MESSAGES.NOT_FOUND);
		}

		console.log(user.login); // TODO Доделать Вход
		const token = await generateToken(user);

		return Status.success(res, { token, user });
	}

	async register(req: Request, res: Response) {
		const { login, email, password } = req.body;
		console.log(req.body);

		const user = await User.createUser({
			login,
			email,
			password,
		});

		const token = generateToken(user);

		Status.success(res, { auth: { token, user } });
	}
}

export default new AuthController();
