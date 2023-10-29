import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envinfo";
import ERROR_MESSAGES from "../Message/Errors";
import { IUser } from "../interface/User";

async function getUserData(userData: IUser) {
	const { login } = userData;
	return { login };
}

async function generateToken(user: IUser) {
	const userData = getUserData(user);
	return jwt.sign(userData, SECRET_KEY, {
		expiresIn: "1d",
	});
}

async function decodeToken(token: string) {
	const decoded = jwt.verify(token, SECRET_KEY) as IUser;
	const userData = getUserData(decoded);

	if (typeof decoded === "string") {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}
	return userData;
}

export { generateToken, decodeToken };
