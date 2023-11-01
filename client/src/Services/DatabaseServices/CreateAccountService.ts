import {
	IUserAccountData,
	IRestaurantAccountData,
	ICourierAccountData,
	IAccountData,
} from "../../interface/RegisterInterface/AccountData";
import {
	ICourierRegisterData,
	IRegisterData,
	IRestaurantRegisterData,
	IUserRegisterData,
} from "../../interface/RegisterInterface/RegisterData";
import { EnumRole } from "../../interface/Account/Role";
import Courier from "../../models/Courier";
import Restaurant from "../../models/Restaurant";
import User from "../../models/User";
import { ICourierModel } from "../../interface/Courier/Courier";
import { IRestaurantModel } from "../../interface/Restaurant/Restaurant";
import { IUser, IUserFunctions, IUserModel } from "../../interface/User/User";

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

// ПОЛЬЗОВАТЕЛЬ --------------------------------------------------

async function createUserAccount(
	data: IUserRegisterData
): Promise<IUserAccountData | undefined> {
	return (await accountCreate(User, data)) as IUserAccountData;
}

// РЕСТОРАН --------------------------------------------------

async function createRestaurantAccount(
	data: IRestaurantRegisterData
): Promise<IRestaurantAccountData | undefined> {
	return (await accountCreate(Restaurant, data)) as IRestaurantAccountData;
}

// КУРЬЕР --------------------------------------------------

async function createCourierAccount(
	data: ICourierRegisterData
): Promise<ICourierAccountData | undefined> {
	return (await accountCreate(Restaurant, data)) as ICourierAccountData;
}

// ОСНОВНАЯ ФУНКЦИЯ ----------------------------------------

async function createAccount(
	registerData: IRegisterData
): Promise<IAccountData | undefined> {
	const { role } = registerData;

	switch (role) {
		case EnumRole.User:
			return await createUserAccount(registerData as IUserRegisterData);
		case EnumRole.Restaurant:
			return await createRestaurantAccount(
				registerData as IRestaurantRegisterData
			);
		case EnumRole.Courier:
			return await createCourierAccount(
				registerData as ICourierRegisterData
			);
	}
}

export default createAccount;
