import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envInfo";
import ERROR_MESSAGES from "../Message/Errors";
import { EnumRole } from "../interface/Role";
import User from "../models/User";
import Restaurant from "../models/Restaurant";
import Courier from "../models/Courier";
import { IUser } from "../interface/User";
import { IRestaurant } from "../interface/Restaurant";
import { ICourier } from "../interface/Courier";

async function generateToken(data: any) {
	return jwt.sign(data, SECRET_KEY, {
		expiresIn: "1d",
	});
}

async function decodingWithRole(
	data: any
): Promise<IUser | IRestaurant | ICourier | null> {
	switch (data.role) {
		case EnumRole.User:
			return await User.findOne({ login: data.login });
		case EnumRole.Restaurant:
			return await Restaurant.findOne({ name: data.name });
		case EnumRole.Courier:
		default:
			return await Courier.findOne({ login: data.login });
	}
}

async function decodeToken(token: string) {
	const decoded = jwt.verify(token, SECRET_KEY);

	if (typeof decoded === "string") {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}

	const account = decodingWithRole(decoded);

	return account;
}

export { generateToken, decodeToken };
