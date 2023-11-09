import { CourierTypes } from "../../../Types/CourierTypes";

export const CourierRegistrationData = {
	isEmpty(data: CourierTypes.GetRegistrationData): boolean {
		const { courier, login, password, role } = data;

		if (!courier || !login || !password || !role) return true;

		return false;
	}, // 1
};
