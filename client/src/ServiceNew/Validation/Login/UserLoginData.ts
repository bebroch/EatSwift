import { UserTypes } from "../../../Types/UserTypes";

export const UserLoginData = {
	isEmpty(data: UserTypes.GetLoginData): boolean {
		const { user, login, password, role } = data;

		if (!user || !login || !password || !role) return true;

		return false;
	},
};
