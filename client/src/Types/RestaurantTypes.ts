import { EnumRole } from "../Enums/Role";
import { IDish } from "../interface/DishModel";
import { IMenu } from "../interface/MenuModel";
import { IRestaurantFunctions } from "../interface/Restaurant";

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
		name: string;
		login: string;
		email: string;
		password: string;
		confirmPassword: string;
		role: EnumRole;
	};

	export type GetDataDetails = IRestaurantFunctions & {
		menu: IMenu[];
		dish: IDish[];
	};

	export type outputModel = IRestaurantFunctions;

	export type outputModelOrUndefined = outputModel | undefined;
}

export { RestaurantTypes };
