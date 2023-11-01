import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../envInfo";
import ERROR_MESSAGES from "../Message/Errors";
import { EnumRole } from "../interface/Account/Role";
import User from "../models/User";
import Restaurant from "../models/Restaurant";
import Courier from "../models/Courier";
import { IUser } from "../interface/User/User";
import { IRestaurant } from "../interface/Restaurant/Restaurant";
import { ICourier } from "../interface/Courier/Courier";
import executeFunctionBasedOnRole from "./ExecuteFunctionBasedOnRole";

async function generateToken(data: any) {
	return jwt.sign(data, SECRET_KEY, {
		expiresIn: "1d",
	});
}

async function decodingWithRole(
	data: any
): Promise<IUser | IRestaurant | ICourier | null> {
	return executeFunctionBasedOnRole(data.role, {
		user: await User.findOne({ login: data.login }),
		restaurant: await Restaurant.findOne({ name: data.name }),
		courier: await Courier.findOne({ login: data.login }),
	});
}

async function decodeToken(
	token: string
): Promise<IUser | IRestaurant | ICourier | null> {
	const decoded = jwt.verify(token, SECRET_KEY);

	if (typeof decoded === "string") {
		throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
	}

	const account = decodingWithRole(decoded);

	return account;
}

export { generateToken, decodeToken };
