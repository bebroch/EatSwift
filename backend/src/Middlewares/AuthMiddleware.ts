import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../envinfo";
import { IUser } from "../interface/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import ERROR_MESSAGES from "../Message/Errors";
import User from "../models/User";

async function verifyToken(token: string): Promise<IUser | null> {
	try {
		const { _id, login } = jwt.verify(token, SECRET_KEY) as JwtPayload;

		return User.findOne({
			_id,
			login,
		});
	} catch (err) {
		throw err;
	}
}

async function AuthMiddleware(
	req: Request & { user?: IUser },
	res: Response,
	next: NextFunction
) {
	const token = (req.headers["Authorization"] as string).split(" ")[1];

	try {
		const user = await verifyToken(token);

		if (!user) {
			return res
				.status(401)
				.json({ error: ERROR_MESSAGES.UN_AUTHORIZED });
		}

		req.user = user;

		return next();
	} catch (err) {
		return res
			.status(500)
			.json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
	}
}

export { AuthMiddleware };
