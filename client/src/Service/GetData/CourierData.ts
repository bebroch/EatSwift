import { Request } from "express";
import { CourierTypes } from "../../Types/CourierTypes";
import { ICourierFunctions } from "../../interface/Courier";

export const CourierData = {
	getPrivate(
		req: Request & CourierTypes.GetPrivate
	): CourierTypes.outputModelOrUndefined {
		return req.courier;
	},
	getPublic(req: Request & { publicCourier?: ICourierFunctions }) {
		return req.publicCourier;
	},
};
