import { SALT_STRING, SECRET_KEY } from "../envInfo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ERROR_MESSAGES from "../Message/Errors";
import { TokenData, outputTokenDataOrNull } from "../Types/Token/GenerateTypes";
import ExceptionErrorService from "./ExceptionErrorService";

class TokenService {
	generateToken(data: TokenData): string {
		return jwt.sign(data, SECRET_KEY, {
			expiresIn: "1d",
		});
	}

	decodeToken(token: string): outputTokenDataOrNull {
		const decoded = jwt.verify(token, SECRET_KEY) as TokenData | null;

		if (typeof decoded === "string") {
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_TOKEN);
		}

		return decoded;
	}

	async hashingPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, SALT_STRING as string);
	}

	async verifyPassword(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}

export default new TokenService();
