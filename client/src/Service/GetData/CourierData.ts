import { Request } from "express";
import { CourierTypes } from "../../Types/CourierTypes";

export const CourierData = {
	getPrivate(
		req: Request & CourierTypes.GetPrivate
	): CourierTypes.outputModelOrUndefined {
		return req.courier;
	},
	getPublic(req: Request) {
		return req.params.login;
	},
};
