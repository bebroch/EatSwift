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
		courier: ICourierFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type outputModel = ICourierFunctions;

	export type outputModelOrUndefined = outputModel | undefined;
}

export { CourierTypes };
