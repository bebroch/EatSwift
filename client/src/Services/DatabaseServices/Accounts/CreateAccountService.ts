import {
	IUserAccountData,
	IRestaurantAccountData,
	ICourierAccountData,
	IAccountData,
} from "../../../interface/RegisterInterface/AccountData";
import {
	ICourierRegisterData,
	IRegisterData,
	IRestaurantRegisterData,
	IUserRegisterData,
} from "../../../interface/RegisterInterface/RegisterData";
import { EnumRole } from "../../../interface/Account/Role";
import Courier from "../../../models/Courier";
import Restaurant from "../../../models/Restaurant";
import User from "../../../models/User";
import { ICourierModel } from "../../../interface/Courier/Courier";
import { IRestaurantModel } from "../../../interface/Restaurant/Restaurant";
import {
	IUser,
	IUserFunctions,
	IUserModel,
} from "../../../interface/User/User";
import executeFunctionBasedOnRole from "../../ExecuteFunctionBasedOnRole";

async function accountCreate(
	model: IUserModel | IRestaurantModel | ICourierModel,
	data: any
): Promise<IAccountData | undefined> {
	const account = await model.createAccount(data);

	if (!account) {
		return undefined;
	}

	const token = await account.generateToken();

	return { token, account };
}

// ПОЛЬЗОВАТЕЛЬ V--------------------------------------------------V

async function createUserAccount(
	data: IUserRegisterData
): Promise<IUserAccountData | undefined> {
	return (await accountCreate(User, data)) as IUserAccountData;
}

// РЕСТОРАН V--------------------------------------------------V

async function createRestaurantAccount(
	data: IUserRegisterData
): Promise<IRestaurantAccountData | undefined> {
	return (await accountCreate(Restaurant, data)) as IRestaurantAccountData;
}

// КУРЬЕР V--------------------------------------------------V

async function createCourierAccount(
	data: IUserRegisterData
): Promise<ICourierAccountData | undefined> {
	return (await accountCreate(Courier, data)) as ICourierAccountData;
}

// ОСНОВНАЯ ФУНКЦИЯ V----------------------------------------V

async function createAccount(
	registerData: IRegisterData
): Promise<IAccountData | undefined> {
	const { role } = registerData;

	return (await executeFunctionBasedOnRole(role, {
		user: async () => {
			return await createUserAccount(registerData);
		},
		restaurant: async () => {
			return await createRestaurantAccount(registerData);
		},
		courier: async () => {
			return await createCourierAccount(registerData);
		},
	})) as IAccountData | undefined;
}

export default createAccount;
