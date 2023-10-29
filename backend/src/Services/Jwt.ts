import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envinfo";
import ERROR_MESSAGES from "../Message/Errors";
import { IUser } from "../interface/User";

async function generateToken(userData: IUser) {
	const { login } = userData;
	return jwt.sign({ login }, SECRET_KEY as string, {
		expiresIn: "1d",
	});
}

async function decodeToken(token: string): Promise<IUser> {
	const decoded = jwt.verify(token, SECRET_KEY as string);

	console.log(decoded);

	if (typeof decoded === "string") {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}
	return decoded as IUser;
}

export { generateToken, decodeToken };
