import { Request, Response } from "express";
import { generateToken } from "../Services/Jwt";
import User from "../models/User";
import Status from "../Services/Status";
import ERROR_MESSAGES from "../Message/Errors";
import bcrypt from "bcrypt";

class AuthController {
	async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (!user) {
			return Status.notFound(res, ERROR_MESSAGES.NOT_FOUND);
		}

		console.log(user);
		const token = await generateToken(user); // TODO Доделать Вход, тут ошибка

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

		const token = await generateToken(user); // TODO и тут ошибка

		Status.success(res, { auth: { token, user } });
	}
}

export default new AuthController();
