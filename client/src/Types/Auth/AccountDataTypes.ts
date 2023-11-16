import { EnumRole } from "../../Enums/Role";
import { ICourierFunctions } from "../../interface/Courier";
import { IRestaurantFunctions } from "../../interface/Restaurant";
import { IUserFunctions } from "../../interface/User";

namespace AccountDataTypes {
	export type GetModels =
		| IUserFunctions
		| IRestaurantFunctions
		| ICourierFunctions;

	export type GetDataModels = {
		account: IUserFunctions | IRestaurantFunctions | ICourierFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};
}

export default AccountDataTypes;
