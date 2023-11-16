import { EnumRole } from "../../Enums/Role";

namespace RegisterTypes {
	export type GetRegistrationData = {
		login: string;
		name?: string;
		firstName?: string;
		lastName?: string;
		email: string;
		password: string;
		confirmPassword: string;
		role: EnumRole;
	};

	export type GetRegistrationDataOrNull = GetRegistrationData | null;

	export type outputRegistrationData = GetRegistrationData;
}

export default RegisterTypes;
