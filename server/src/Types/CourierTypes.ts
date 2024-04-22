import { ObjectId } from "mongoose";
import { EnumRole } from "../interface/Account/Role";
import { ICourierFunctions } from "../interface/Courier/Courier";

namespace CourierTypes {
	export type GetPrivate = {
		courier?: ICourierFunctions;
	};

	export type GetPublic = {
		publicCourier?: ICourierFunctions;
	};

	export type GetLoginData = {
		courier: ICourierFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type GetRegistrationData = {
		firstName: string;
		lastName: string;
		login: string;
		email: string;
		password: string;
		confirmPassword: string;
		role: EnumRole;
	};

	export type outputModel = ICourierFunctions;

	export type outputModelOrUndefined = outputModel | undefined;

	export type GetOrderFromHistory = {
		order_id: string | ObjectId;
	};
}

export { CourierTypes };
