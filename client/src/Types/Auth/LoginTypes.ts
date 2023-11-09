import { EnumRole } from "../../interface/Account/Role";
import { ICourierFunctions } from "../../interface/Courier/Courier";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../interface/User/User";

type GetLoginData = {
	login: string;
	password: string;
	role: EnumRole;
};

type GetLoginDataWithModel = {
	user?: IUserFunctions;
	restaurant?: IRestaurantFunctions;
	courier?: ICourierFunctions;
	login: string;
	password: string;
	role: EnumRole;
};

type GetLoginDataOrNull = GetLoginData | null | undefined;

type GetLoginDataWithModelOrNull = GetLoginData | null | undefined;

type outputLoginData = GetLoginData;

export {
	GetLoginData,
	GetLoginDataWithModel,
	GetLoginDataOrNull,
	GetLoginDataWithModelOrNull,
	outputLoginData,
};
