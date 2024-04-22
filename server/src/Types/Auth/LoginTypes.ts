import { EnumRole } from "../../interface/Account/Role";
import { ICourier, ICourierFunctions } from "../../interface/Courier/Courier";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import { IUser, IUserFunctions } from "../../interface/User/User";

namespace LoginTypes {
	export type GetLoginData = {
		login: string;
		password: string;
		role: EnumRole;
	};

	export type GetTokenWithModel = {
		token: string;
		user?: IUserFunctions;
		restaurant?: IRestaurantFunctions;
		courier?: ICourierFunctions;
	};

	export type GetLoginDataWithModel = {
		user?: IUserFunctions;
		restaurant?: IRestaurantFunctions;
		courier?: ICourierFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type GetLoginDataOrNull = GetLoginData | null | undefined;

	export type GetLoginDataWithModelOrNull = GetLoginData | null | undefined;

	export type outputLoginData = GetLoginData;

	export type GetForFormatted = (IUser | IRestaurant | ICourier) & Document;
}

export default LoginTypes;
