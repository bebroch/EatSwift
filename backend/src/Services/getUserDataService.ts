import { IUser } from "../interface/User";

function getUserDataService(user: IUser) {
	return {
		login: user.login,
		email: user.email,
		address: user.address,
		phoneNumber: user.phoneNumber,
		cart: user.cart,
		createdAt: user.createdAt,
	};
}

function getUserProfileDataService(user: IUser) {
	return {
		login: user.login,
		email: user.email,
		createdAt: user.createdAt,
	};
}

export { getUserDataService, getUserProfileDataService };
