import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../Message/Errors";
import Status from "../../Service/Status";
import GetData from "../../Service/GetData";
import Courier from "../../models/CourierModel";
import {
	ICourierFunctions,
	ICourierModel,
} from "../../interface/Courier/Courier";
import { AuthMiddleware } from "./AuthMiddleware";
import ExceptionService from "../../Service/ExceptionService";

async function CourierAuthMiddleware(
	req: Request & { courier?: ICourierFunctions },
	res: Response,
	next: NextFunction
) {
	try {
		const courierAccount = (await AuthMiddleware(
			req,
			Courier
		)) as ICourierFunctions;

		req.courier = courierAccount;

		return next();
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

export { CourierAuthMiddleware };
