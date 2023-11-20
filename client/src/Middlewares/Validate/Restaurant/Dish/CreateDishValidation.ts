import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../../Message/Errors";
import Status from "../../../../Service/Status";

function CreateDishValidator(req: Request, res: Response, next: NextFunction) {
	const { name, description, ingredients, price } = req.body;

	if (!name || !description || !ingredients || !price)
		Status.badRequest(
			res,
			ERROR_MESSAGES.NAME_DESCRIPTION_INGREDIENTS_PRICE_REQUIRED
		);

	if (price < 0)
		Status.badRequest(res, ERROR_MESSAGES.PRICE_MUST_BE_GREATER_THAN_ZERO);

	next();
}

export default CreateDishValidator;
