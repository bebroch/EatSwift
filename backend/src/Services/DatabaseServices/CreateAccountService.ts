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
import { EnumRole } from "../../interface/Role";
import Courier from "../../models/Courier";
import Restaurant from "../../models/Restaurant";
import User from "../../models/User";
import { generateToken } from "../Jwt";
import { hashingPassword } from "../Password";

// ПОЛЬЗОВАТЕЛЬ --------------------------------------------------

async function createUserAccount(
	data: IUserRegisterData
): Promise<IUserAccountData | undefined> {
	const { login, email, password } = data;

	const passwordHash = await hashingPassword(password);

	const user = await User.createUser({
		login,
		email,
		password: passwordHash,
	});

	if (!user) {
		return undefined;
	}

	const userData = {
		login: user.login,
		email: user.email,
		role: EnumRole.User,
	};

	const token = await generateToken(userData);

	return { token, user };
}

// РЕСТОРАН --------------------------------------------------

async function createRestaurantAccount(
	data: IRestaurantRegisterData
): Promise<IRestaurantAccountData | undefined> {
	const { name, email, password } = data;

	const passwordHash = await hashingPassword(password);

	const restaurant = await Restaurant.createRestaurant({
		name,
		email,
		rating: 0,
		password: passwordHash,
		verified: false,
	});

	if (!restaurant) {
		return undefined;
	}

	const restaurantData = {
		name: restaurant.name,
		email: restaurant.email,
		role: EnumRole.Restaurant,
	};

	const token = await generateToken(restaurant);

	return { token, restaurant };
}

// КУРЬЕР --------------------------------------------------

async function createCourierAccount(
	data: ICourierRegisterData
): Promise<ICourierAccountData | undefined> {
	const { login, email, password } = data;

	const passwordHash = await hashingPassword(password);

	const courier = await Courier.createCourier({
		login,
		email,
		password: passwordHash,
		verified: false,
	});

	if (!courier) {
		return undefined;
	}

	const restaurantData = {
		name: courier.login,
		email: courier.email,
		role: EnumRole.Restaurant,
	};

	const token = await generateToken(restaurantData);

	return { token, courier };
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
