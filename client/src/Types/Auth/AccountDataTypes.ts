import { EnumRole } from "../../interface/Account/Role";
import { ICourierFunctions } from "../../interface/Courier/Courier";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../interface/User/User";

type GetAccountData = {
	account: IUserFunctions | IRestaurantFunctions | ICourierFunctions;
	login: string;
	password: string;
	role: EnumRole;
};

export { GetAccountData };
