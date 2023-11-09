import { RestaurantTypes } from "../../../Types/RestaurantTypes";

export const RestaurantRegistrationData = {
	isEmpty(data: RestaurantTypes.GetRegistrationData): boolean {
		const { restaurant, login, password, role } = data;

		if (!restaurant || !login || !password || !role) return true;

		return false;
	},
};
