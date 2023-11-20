import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../../Message/Errors";
import Status from "../../../../Service/Status";

function CreateMenuValidator(req: Request, res: Response, next: NextFunction) {
	const { name, description } = req.body;

	if (!name || !description)
		return Status.badRequest(res, ERROR_MESSAGES.NAME_DESCRIPTION_REQUIRED);
	
	next();
}

export default CreateMenuValidator;
