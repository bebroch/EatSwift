import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../../Message/Errors";
import Status from "../../../../Service/Status";

function UpdateMenuValidator(req: Request, res: Response, next: NextFunction) {
	const { dish_id } = req.body;
	const { menu_id } = req.params;

	if (!dish_id || !menu_id) {
		Status.badRequest(res, ERROR_MESSAGES.MENU_ID_AND_DISH_ID_REQUIRED);
	}

	next();
}

export default UpdateMenuValidator;
