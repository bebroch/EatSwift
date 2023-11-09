import { CourierTypes } from "../../../Types/CourierTypes";

export const CourierLoginData = {
	isEmpty(data: CourierTypes.GetLoginData): boolean {
		const { courier, login, password, role } = data;

		if (!courier || !login || !password || !role) return true;

		return false;
	},
};
