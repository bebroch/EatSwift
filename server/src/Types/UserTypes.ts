import { ObjectId } from "mongoose";
import { EnumRole } from "../interface/Account/Role";
import { IUser, IUserFunctions } from "../interface/User/User";
import CartTypes from "./CartTypes";

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

	export type GetDataForAddToCart = baseData;

	export type GetDataForDelete = baseData;

	type baseData = {
		restaurant_id: ObjectId;
		dish_id: ObjectId;
	};

	export type GetDataForDetails = IUserFunctions & {
		cart: CartTypes.GetDataForDetails[] | null;
	};

	export type GetDataDetails = IUserFunctions & {
		cart?: CartTypes.GetDataDetails[];
	};

	export type GetDataForMakeOrder = {
		restaurant_id: ObjectId;
	};

	export type outputDataForDetails = GetDataForDetails;
	export type outputDataDetails = GetDataDetails;

	export type outputDataDetailsWithoutUserId = GetDataDetails;

	export type outputModel = IUserFunctions;
	export type outputModelOrUndefined = outputModel | undefined;
}

export { UserTypes };
