import { RestaurantTypes } from "../../../Types/RestaurantTypes";

export const RestaurantRegistrationData = {
	isEmpty(data: RestaurantTypes.GetRegistrationData): boolean {
		const { login, password, role } = data;

		if (!login || !password || !role) return true;

		return false;
	},
};
