import ERROR_MESSAGES from "../../Message/Errors";
import { GetRegistrationData } from "../../Types/AuthTypes";
import { CourierTypes } from "../../Types/CourierTypes";
import { RestaurantTypes } from "../../Types/RestaurantTypes";
import { UserTypes } from "../../Types/UserTypes";
import { EnumRole } from "../../interface/Account/Role";
import { ICourierModel } from "../../interface/Courier/Courier";
import { IRestaurantModel } from "../../interface/Restaurant/Restaurant";
import { IUserModel } from "../../interface/User/User";
import Courier from "../../models/CourierModel";
import Restaurant from "../../models/RestaurantModel";
import User from "../../models/UserModel";
import ValidateService from "../ValidateService";

class RegistrationService {
	async Registration(registerData: GetRegistrationData) {
		if (ValidateService.Registration.isEmpty(registerData)) {
			throw new Error(ERROR_MESSAGES.INVALID_LOGIN_DATA);
		}

		switch ((registerData as GetRegistrationData).role) {
			case EnumRole.User:
				return this.UserRegistration(
					registerData as UserTypes.GetRegistrationData
				);
			case EnumRole.Restaurant:
				return this.RestaurantRegistration(
					registerData as RestaurantTypes.GetRegistrationData
				);
			case EnumRole.Courier:
				return this.CourierRegistration(
					registerData as CourierTypes.GetRegistrationData
				);
			default:
				throw new Error(ERROR_MESSAGES.INVALID_ROLE);
		}
	}

	async UserRegistration(userData: UserTypes.GetRegistrationData) {
		return this.RegistrationAccount(User, userData);
	}

	async RestaurantRegistration(
		restaurantData: RestaurantTypes.GetRegistrationData
	) {
		return this.RegistrationAccount(Restaurant, restaurantData);
	}

	async CourierRegistration(courierData: CourierTypes.GetRegistrationData) {
		return this.RegistrationAccount(Courier, courierData);
	}

	// TODO Сделать тип TYPE
	async RegistrationAccount(
		model: IUserModel | IRestaurantModel | ICourierModel,
		data: any
	) {
		const account = await model.createAccount(data);

		if (!account) {
			return undefined;
		}

		const token = await account.generateToken();

		return { token, account };
	}
}

export default new RegistrationService(); // 1
