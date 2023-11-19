import ERROR_MESSAGES from "../../Message/Errors";
import LoginTypes from "../../Types/Auth/RegistrationTypes";
import { CourierTypes } from "../../Types/CourierTypes";
import { RestaurantTypes } from "../../Types/RestaurantTypes";
import { UserTypes } from "../../Types/UserTypes";
import { EnumRole } from "../../interface/Account/Role";
import {
	ICourierFunctions,
	ICourierModel,
} from "../../interface/Courier/Courier";
import {
	IRestaurantFunctions,
	IRestaurantModel,
} from "../../interface/Restaurant/Restaurant";
import { IUserFunctions, IUserModel } from "../../interface/User/User";
import Courier from "../../models/CourierModel";
import Restaurant from "../../models/RestaurantModel";
import User from "../../models/UserModel";
import ExceptionErrorService from "../ExceptionErrorService";
import ValidateService from "../ValidateService";

class RegistrationService {
	async Registration(registerData: LoginTypes.GetRegistrationData): Promise<{
		token: string;
		account: IUserFunctions | IRestaurantFunctions | ICourierFunctions;
		role: EnumRole;
	}> {
		if (ValidateService.Registration.isEmpty(registerData))
			ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_LOGIN_DATA);

		switch ((registerData as LoginTypes.GetRegistrationData).role) {
			case EnumRole.User:
				return await this.UserRegistration(
					registerData as UserTypes.GetRegistrationData
				);
			case EnumRole.Restaurant:
				return await this.RestaurantRegistration(
					registerData as RestaurantTypes.GetRegistrationData
				);
			case EnumRole.Courier:
				return await this.CourierRegistration(
					registerData as CourierTypes.GetRegistrationData
				);
			default:
				ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ROLE);
		}
	}

	async UserRegistration(userData: UserTypes.GetRegistrationData) {
		return {
			...(await this.RegistrationAccount(User, userData)),
			role: EnumRole.User,
		};
	}

	async RestaurantRegistration(
		restaurantData: RestaurantTypes.GetRegistrationData
	) {
		return {
			...(await this.RegistrationAccount(Restaurant, restaurantData)),
			role: EnumRole.Restaurant,
		};
	}

	async CourierRegistration(courierData: CourierTypes.GetRegistrationData) {
		return {
			...(await this.RegistrationAccount(Courier, courierData)),
			role: EnumRole.Courier,
		};
	}

	async RegistrationAccount(
		model: IUserModel | IRestaurantModel | ICourierModel,
		data: any
	) {
		const account = await model.createAccount(data);

		if (!account) ExceptionErrorService.handler(ERROR_MESSAGES.ACCOUNT_CREATION_FAILED);

		const token = await account.generateToken();
		return { token, account };
	}
}

export default new RegistrationService();
