import { Request, Response, NextFunction } from "express";
import ExceptionErrorService from "../../../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../../../Message/Errors";

function DeleteMenuValidator(req: Request, res: Response, next: NextFunction) {
	const { _id } = req.body;

	if (!_id)
		ExceptionErrorService.handler(ERROR_MESSAGES.ID_REQUIRED)
	
	next();
}

export default DeleteMenuValidator;
