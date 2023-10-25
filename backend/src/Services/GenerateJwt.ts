import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envinfo";

export default async function generateJwt (userData: any) {
	return jwt.sign(userData, SECRET_KEY as string, {
		expiresIn: "1d",
	});
}
