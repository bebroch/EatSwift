
import { GetRegistrationData, GetRegistrationDataOrNull } from "../../Types/Auth/RegistrationTypes";
import { EnumRole } from "../../interface/Account/Role";
import Courier from "../../models/CourierModel";
import Restaurant from "../../models/RestaurantModel";
import User from "../../models/UserModel";
import { CourierRegistrationData } from "./Registration/CourierRegistrationData";
import { RestaurantRegistrationData } from "./Registration/RestaurantRegistrationData";
import { UserRegistrationData } from "./Registration/UserRegistrationData";

function checkBaseFields(fields: {
	// TODO Сделать TYPE
	login: string;
	email: string;
	password: string;
	confirmPassword: string;
}): boolean {
	const { login, email, password, confirmPassword } = fields;
	return !login || !email || !password || !confirmPassword;
}

export const RegistrationValidate = {
	User: UserRegistrationData,
	Restaurant: RestaurantRegistrationData,
	Courier: CourierRegistrationData,

	isEmpty(data: GetRegistrationData): boolean {
		return !data;
	},

	checkRoleExist(registrationData: GetRegistrationDataOrNull) {
		if (!registrationData) return false;

		const { role } = registrationData;
		return Object.values(EnumRole).includes(role);
	},

	checkMissingFields(registrationData: GetRegistrationDataOrNull) {
		if (!registrationData) return true;

		const { firstName, lastName, name, role } = registrationData;
		const baseFields = registrationData;

		switch (role) {
			case EnumRole.User:
				return checkBaseFields(baseFields);
			case EnumRole.Restaurant:
				return !name || checkBaseFields(baseFields);
			case EnumRole.Courier:
				return !firstName || !lastName || checkBaseFields(baseFields);
		}

		return true;
	},

	checkConfirmPassword(registrationData: GetRegistrationDataOrNull) {
		if (!registrationData) return true;

		const { password, confirmPassword } = registrationData;
		return password !== confirmPassword;
	},

	async checkAccountExist(registrationData: GetRegistrationDataOrNull) {
		if (!registrationData) return true;

		const { login, role } = registrationData;

		switch (role) {
			case EnumRole.User:
				return Boolean(await User.findAccountByLogin(login));
			case EnumRole.Restaurant:
				return Boolean(await Restaurant.findAccountByLogin(login));
			case EnumRole.Courier:
				return Boolean(await Courier.findAccountByLogin(login));
		}

		return true;
	},
};
