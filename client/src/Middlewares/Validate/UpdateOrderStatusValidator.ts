UpdateOrderStatusValidator;

import { Request, Response, NextFunction } from "express";
import { OrderStatus } from "../../Enums/Order/OrderStatus";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";
import Status from "../../Service/Status";

export function UpdateOrderStatusValidator(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { status } = req.body;

	if (!(status in OrderStatus))
		return Status.badRequest(res, ERROR_MESSAGES.INVALID_ORDER_STATUS);

	next();
}
