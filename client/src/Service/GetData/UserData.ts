import { Request } from "express";
import { UserTypes } from "../../Types/UserTypes";

export const UserData = {
	get(
		req: Request & UserTypes.GetModelOrUndefined
	): UserTypes.outputModelOrUndefined {
		return req.user;
	},

	getDataForMakeOrder(req: Request) {
		const { restaurant_id } = req.body;
		return { restaurant_id };
	},

	getRating(req: Request) {
		const { restaurant_id, courier_id, rating } = req.body;
		return { restaurant_id, courier_id, rating };
	},
};
