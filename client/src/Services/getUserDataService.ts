import { IUser } from "../interface/User/User";

async function getUserDataService(user: IUser) {
	return {
		login: user.login,
		email: user.email,
		address: user.address,
		phoneNumber: user.phoneNumber,
		cart: user.cart,
		createdAt: user.createdAt,
	};
}

export { getUserDataService };
