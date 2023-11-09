import { EnumRole } from "../../interface/Account/Role";

type GetRegistrationData = {
	login: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: EnumRole;
};

type GetRegistrationDataOrNull = GetRegistrationData | null;

type outputRegistrationData = GetRegistrationData;

export {
	GetRegistrationData,
	GetRegistrationDataOrNull,
	outputRegistrationData,
};
