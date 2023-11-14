import { Request, Response, NextFunction } from "express";
import Courier from "../models/CourierModel";
import ERROR_MESSAGES from "../Message/Errors";
import Status from "../Service/Status";
import { ICourierFunctions } from "../interface/Courier/Courier";

export async function CourierPublicMiddleware(
	//TODO Сделать тип для publicCourier
	req: Request & { publicCourier?: ICourierFunctions },
	res: Response,
	next: NextFunction
) {
	const { login } = req.params;

	const courier = await Courier.findOne({ login });

	if (!courier) {
		return Status.notFound(res, ERROR_MESSAGES.COURIER_NOT_FOUND);
	}

	req.publicCourier = courier;

	next();
}
