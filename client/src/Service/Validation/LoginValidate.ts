import { UserLoginData } from "./Login/UserLoginData";
import { RestaurantLoginData } from "./Login/RestaurantLoginData";
import { CourierLoginData } from "./Login/CourierLoginData";
import { EnumRole } from "../../interface/Account/Role";
import User from "../../models/UserModel";
import Restaurant from "../../models/RestaurantModel";
import Courier from "../../models/CourierModel";
import ERROR_MESSAGES from "../../Message/Errors";
import { TAccount } from "../../interface/Account/Account";
import { GetLoginData, GetLoginDataOrNull } from "../../Types/Auth/LoginTypes";

export const LoginValidate = {
	User: UserLoginData,
	Restaurant: RestaurantLoginData,
	Courier: CourierLoginData,

	isEmpty(data: GetLoginData | undefined | null): boolean {
		if (data === undefined || data === null) return true;

		if (data.login === undefined || data.login === null) return true;

		if (data.password === undefined || data.password === null) return true;

		if (data.role === undefined || data.role === null) return true;

		return false;
	},

	isRoleExist(loginData: GetLoginDataOrNull) {
		if (!loginData) return false;

		const { role } = loginData;

		return Object.values(EnumRole).includes(role);
	},

	checkMissingFields(loginData: GetLoginDataOrNull) {
		const { login, password } = loginData ?? {
			login: null,
			password: null,
		};

		return !login || !password;
	},

	async checkAccountExist(
		loginData: GetLoginDataOrNull
	): Promise<TAccount | null> {
		if (!loginData) return null;

		const { login, role } = loginData;

		switch (role) {
			case EnumRole.User:
				return await User.findOne({ login });
			case EnumRole.Restaurant:
				return await Restaurant.findOne({ login });
			case EnumRole.Courier:
				return await Courier.findOne({ login });
		}

		console.log(ERROR_MESSAGES.INVALID_ROLE);
	},
};