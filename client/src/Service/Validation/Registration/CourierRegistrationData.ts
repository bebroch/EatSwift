import { CourierTypes } from "../../../Types/CourierTypes";

export const CourierRegistrationData = {
	isEmpty(data: CourierTypes.GetRegistrationData): boolean {
		const { login, password, role } = data;

		if (!login || !password || !role) return true;

		return false;
	},
};
