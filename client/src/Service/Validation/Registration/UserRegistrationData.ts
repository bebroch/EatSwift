import { UserTypes } from "../../../Types/UserTypes";

export const UserRegistrationData = {
	isEmpty(data: UserTypes.GetRegistrationData): boolean {
		const { login, password, role } = data;

		if (!login || !password || !role) return true;

		return false;
	},
};
