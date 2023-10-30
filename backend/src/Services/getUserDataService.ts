import { IUser } from "../interface/User";

function getUserDataService(user: IUser) {
	return {
		login: user.login,
		email: user.email,
		createdAt: user.createdAt,
	};
}

export default getUserDataService;
