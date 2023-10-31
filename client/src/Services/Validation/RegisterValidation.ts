import { EnumRole } from "../../interface/Role";
import Courier from "../../models/Courier";
import Restaurant from "../../models/Restaurant";
import User from "../../models/User";

async function checkMissingFields(fields: any): Promise<boolean> {
	const {
		firstName,
		lastName,
		name,
		login,
		email,
		password,
		confirmPassword,
		role,
	} = fields;

	switch (role) {
		case EnumRole.User:
			return !login || !email || !password || !confirmPassword;
		case EnumRole.Restaurant:
			return !name || !login || !email || !password || !confirmPassword;
		case EnumRole.Courier:
			return (
				!firstName ||
				!lastName ||
				!login ||
				!email ||
				!password ||
				!confirmPassword
			);
	}

	return true;
}

async function checkConfirmPassword(fields: any): Promise<boolean> {
	const { password, confirmPassword } = fields;

	return password !== confirmPassword;
}

async function checkAccountExist(fields: any): Promise<boolean> {
	const { login, email, role } = fields;

	switch (role) {
		case EnumRole.User:
			return (
				Boolean(await User.findUserByLogin(login)) &&
				Boolean(await User.findUserByEmail(email))
			);
		case EnumRole.Restaurant:
			return (
				Boolean(await Restaurant.findRestaurantByLogin(login)) &&
				Boolean(await Restaurant.findRestaurantByEmail(email))
			);
		case EnumRole.Courier:
			return (
				Boolean(await Courier.findCourierByLogin(login)) &&
				Boolean(await Courier.findCourierByEmail(email))
			);
	}

	return true;
}

async function checkRoleExist(fields: any): Promise<boolean> {
	const { role } = fields;

	if (Object.values(EnumRole).includes(role)) {
		return true;
	} else {
		return false;
	}
}

export {
	checkMissingFields,
	checkConfirmPassword,
	checkAccountExist,
	checkRoleExist,
};
