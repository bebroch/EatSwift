import { EnumRole } from "../interface/Account/Role";
import { ICourierFunctions } from "../interface/Courier/Courier";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../interface/User/User";

type GetLoginData = {
	user?: IUserFunctions;
	restaurant?: IRestaurantFunctions;
	courier?: ICourierFunctions;
	login: string;
	password: string;
	role: EnumRole;
};

type GetLoginDataOrNull = GetLoginData | null;

type GetRegistrationData = {
	user?: IUserFunctions;
	restaurant?: IRestaurantFunctions;
	courier?: ICourierFunctions;
	login: string;
	password: string;
	role: EnumRole;
};

type GetAccountData = {
	account: IUserFunctions | IRestaurantFunctions | ICourierFunctions;
	login: string;
	password: string;
	role: EnumRole;
};

type outputLoginData = GetLoginData;

type outputRegistrationData = GetRegistrationData;

export {
	GetLoginData,GetLoginDataOrNull,
	GetRegistrationData,
	GetAccountData,
	outputLoginData,
	outputRegistrationData,
};
