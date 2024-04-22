import { ICourierFunctions } from "../../../interface/Courier/Courier";
import { IRestaurantFunctions } from "../../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import LoginTypes from '../../../Types/Auth/LoginTypes';

export const LoginFormatter = {
	get(data: LoginTypes.GetTokenWithModel) {
		const { token, user, restaurant, courier } = data;

		if (user) {
			return {
				token,
				user: DataFormatter.User.get(user as IUserFunctions),
			};
		}

		if (restaurant) {
			return {
				token,
				restaurant: DataFormatter.Restaurant.getOnlyRestaurant(
					restaurant as IRestaurantFunctions
				),
			};
		}

		if (courier) {
			return {
				token,
				courier: DataFormatter.Courier.get(
					courier as ICourierFunctions
				),
			};
		}
	},
};
