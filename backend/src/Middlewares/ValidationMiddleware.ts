import { Request, Response, NextFunction } from "express";
import User from "../models/User";

async function loginValidation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { login, email, password, confirmPassword } = req.body;

	if (!login || !email || !password || !confirmPassword) {
	}

	if (password !== confirmPassword) {
	}

	return next();
}
