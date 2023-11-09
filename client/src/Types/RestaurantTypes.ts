import { EnumRole } from "../interface/Account/Role";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";

namespace RestaurantTypes {
	export type GetPrivate = {
		restaurant?: IRestaurantFunctions;
	};

	export type GetPublic = {
		publicRestaurant?: IRestaurantFunctions;
	};

	export type GetLoginData = {
		restaurant: IRestaurantFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type GetRegistrationData = {
		restaurant: IRestaurantFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type outputModel = IRestaurantFunctions;

	export type outputModelOrUndefined = outputModel | undefined;
}

export { RestaurantTypes };
