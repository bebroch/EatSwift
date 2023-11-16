import { EnumRole } from "../Enums/Role";
import { ICourierFunctions } from "../interface/Courier";

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
}

export { CourierTypes };
