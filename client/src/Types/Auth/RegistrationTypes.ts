import { EnumRole } from "../../interface/Account/Role";
import { ICourierFunctions } from "../../interface/Courier/Courier";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import { IUserFunctions } from "../../interface/User/User";

namespace RegistrationTypes {
	export type GetDataForValidate = {
		login: string;
		email: string;
		password: string;
		confirmPassword: string;
	};

	export type GetRegistrationData = GetDataForValidate & {
		name?: string;
		firstName?: string;
		lastName?: string;
		role: EnumRole;
	};

	export type GetTokenModelsRole = {
		token: string;
		account: IUserFunctions | IRestaurantFunctions | ICourierFunctions;
		role: EnumRole;
	};

	export type GetRegistrationDataOrNull = GetRegistrationData | null;

	export type outputRegistrationData = GetRegistrationData;
}

export default RegistrationTypes;
