import ERROR_MESSAGES from "../../../Message/Errors";
import { EnumRole } from "../../../interface/Account/Role";
import { ICourierFunctions } from "../../../interface/Courier/Courier";
import { IRestaurantFunctions } from "../../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import ExceptionErrorService from "../../ExceptionErrorService";

export const RegistrationFormatter = {
	get(
		data:
			| {
					// TODO Сделать TYPE
					token: string | undefined;
					account:
						| IUserFunctions
						| IRestaurantFunctions
						| ICourierFunctions;
					role: EnumRole;
			  }
			| undefined
	) {
		if (!data)
			ExceptionErrorService.handler(
				ERROR_MESSAGES.INVALID_REGISTRATION_DATA
			);

		const { token, account, role } = data;

		switch (role) {
			case EnumRole.User:
				return {
					token,
					user: DataFormatter.User.get(account as IUserFunctions),
				};
			case EnumRole.Restaurant:
				return {
					token,
					restaurant: DataFormatter.Restaurant.getOnlyRestaurant(
						account as IRestaurantFunctions
					),
				};
			case EnumRole.Courier:
				return {
					token,
					courier: DataFormatter.Courier.get(
						account as ICourierFunctions
					),
				};
		}
	},
};
