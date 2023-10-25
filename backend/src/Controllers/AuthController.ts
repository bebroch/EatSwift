import { Request, Response } from "express";
import generateJwt from "../Services/GenerateJwt";

class AuthController {
	async login(req: Request, res: Response) {
		const { login, email, password } = req.body;

		

		const userData = {
			login,
			email,
			password,
		};

		generateJwt(userData);
	}

	async register(req: Request, res: Response) {}
}

export default new AuthController();
