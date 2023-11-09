import { Request } from "express";
import { UserTypes } from "../../Types/UserTypes";

export const UserData = {
	get(
		req: Request & UserTypes.GetModelOrUndefined
	): UserTypes.outputModelOrUndefined {
		return req.user;
	},
};
