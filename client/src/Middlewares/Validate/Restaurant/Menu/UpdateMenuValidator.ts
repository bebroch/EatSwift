import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../../Message/Errors";
import Status from "../../../../Service/Status";

function UpdateMenuValidator(req: Request, res: Response, next: NextFunction) {
	const { dish_id } = req.body;

	if (!dish_id) Status.badRequest(res, ERROR_MESSAGES.DISH_ID_REQUIRED);

	next();
}

export default UpdateMenuValidator;
