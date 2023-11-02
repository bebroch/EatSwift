import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envInfo";
import ERROR_MESSAGES from "../Message/Errors";
import { EnumRole } from "../interface/Account/Role";
import { IAccountInformation } from "../interface/Account/Account";

async function generateToken(data: any) {
	return jwt.sign(data, SECRET_KEY, {
		expiresIn: "1d",
	});
}

async function decodeToken(token: string): Promise<IAccountInformation | null> {
	const decoded = jwt.verify(token, SECRET_KEY);

	if (typeof decoded === "string") {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}

	return decoded as IAccountInformation;
}

export { generateToken, decodeToken };
