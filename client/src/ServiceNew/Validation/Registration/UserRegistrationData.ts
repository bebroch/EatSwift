import { UserTypes } from "../../../Types/UserTypes";

export const UserRegistrationData = {
	isEmpty(data: UserTypes.GetRegistrationData): boolean {
		const { user, login, password, role } = data;

		if (!user || !login || !password || !role) return true;

		return false;
	},
};
