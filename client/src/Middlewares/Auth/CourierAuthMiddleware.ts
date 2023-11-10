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
		// TODO Сделать отдельный метод под catch
		if (err.message === ERROR_MESSAGES.UN_AUTHORIZED) {
			return Status.unauthorized(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		if (err.message === ERROR_MESSAGES.INVALID_TOKEN) {
			return Status.unauthorized(res, ERROR_MESSAGES.INVALID_TOKEN);
		}

		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}
}

export { CourierAuthMiddleware };
