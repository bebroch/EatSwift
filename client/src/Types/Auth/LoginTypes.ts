import { EnumRole } from "../../Enums/Role";
import { ICourierFunctions } from "../../interface/Courier";
import { IRestaurantFunctions } from "../../interface/Restaurant";
import { IUserFunctions } from "../../interface/User";

namespace LoginTypes {
	export type GetLoginData = {
		login: string;
		password: string;
		role: EnumRole;
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
}

export default LoginTypes;
