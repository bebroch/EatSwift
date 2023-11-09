import TokenService from "../TokenService";
import { EnumRole } from "../../interface/Account/Role";
import ERROR_MESSAGES from "../../Message/Errors";
import ValidateService from "../ValidateService";
import { GetAccountData, GetLoginData } from "../../Types/AuthTypes";
import { UserTypes } from "../../Types/UserTypes";
import { RestaurantTypes } from "../../Types/RestaurantTypes";
import { LoginData } from "../GetData/Auth/LoginData";
import { CourierTypes } from "../../Types/CourierTypes";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import { ICourierFunctions } from "../../interface/Courier/Courier";
import { IUserFunctions } from "../../interface/User/User";

class LoginService {
	async Login(loginData: GetLoginData): Promise<{
		// TODO Сделать TYPE
		token?: string;
		user?: IUserFunctions;
		restaurant?: IRestaurantFunctions;
		courier?: ICourierFunctions;
	}> {
		if (ValidateService.Login.isEmpty(loginData)) {
			throw new Error(ERROR_MESSAGES.INVALID_LOGIN_DATA);
		}

		switch ((loginData as GetLoginData).role) {
			case EnumRole.User:
				return await this.UserLogin(
					loginData as UserTypes.GetLoginData
				);
			case EnumRole.Restaurant:
				return await this.RestaurantLogin(
					loginData as RestaurantTypes.GetLoginData
				);
			case EnumRole.Courier:
				return await this.CourierLogin(
					loginData as CourierTypes.GetLoginData
				);
			default:
				throw new Error(ERROR_MESSAGES.INVALID_ROLE);
		}
	}

	private async UserLogin(userData: UserTypes.GetLoginData) {
		const { user, login, password, role } = userData;

		const token = await this.generateLoginData({
			account: user,
			login,
			password,
			role,
		});

		return { token, user };
	}

	private async RestaurantLogin(
		restaurantData: RestaurantTypes.GetLoginData
	) {
		const { restaurant, login, password, role } = restaurantData;

		const token = await this.generateLoginData({
			account: restaurant,
			login,
			password,
			role,
		});

		return { token, restaurant };
	}

	private async CourierLogin(courierData: CourierTypes.GetLoginData) {
		const { courier, login, password, role } = courierData;

		const token = await this.generateLoginData({
			account: courier,
			login,
			password,
			role,
		});

		return { token, courier };
	}

	private async generateLoginData(data: GetAccountData) {
		const { account, login, password, role } = data;

		const isPasswordValid = await TokenService.verifyPassword(
			password,
			account.password
		);

		if (!isPasswordValid) return undefined;

		const accountDataForToken = { login, role };

		const token = TokenService.generateToken(accountDataForToken);

		return token;
	}
}

export default new LoginService();
