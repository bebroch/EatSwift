import { RestaurantTypes } from "../../../Types/RestaurantTypes";

export const RestaurantLoginData = {
	isEmpty(data:  RestaurantTypes.GetLoginData): boolean {
		const { restaurant, login, password, role } = data;

		if (!restaurant || !login || !password || !role) return true;

		return false;
	},
};
