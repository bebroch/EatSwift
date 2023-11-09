import { EnumRole } from "../interface/Account/Role";
import { IUser, IUserFunctions } from "../interface/User/User";

namespace UserTypes {
	export type GetModel = {
		user: IUserFunctions;
	};

	export type GetModelOrUndefined = {
		user?: IUserFunctions;
	};

	export type GetLoginData = {
		user: IUserFunctions;
		login: string;
		password: string;
		role: EnumRole;
	};

	export type GetRegistrationData = {
		login: string;
		email: string;
		password: string;
		confirmPassword: string;
		role: EnumRole;
	};

	export type outputModel = IUserFunctions;

	export type outputModelOrUndefined = outputModel | undefined;
}

export { UserTypes };
