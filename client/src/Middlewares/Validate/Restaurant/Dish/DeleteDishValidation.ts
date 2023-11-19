import { Request, Response, NextFunction } from "express";
import ERROR_MESSAGES from "../../../../Message/Errors";
import Status from "../../../../Service/Status";

function DeleteDishValidator(req: Request, res: Response, next: NextFunction) {
	const { restaurant_id } = req.body;
	
	if (!restaurant_id) 
		Status.badRequest(
            res,
            ERROR_MESSAGES.RESTAURANT_ID_REQUIRED
        );
	
	
	next();
}

export default DeleteDishValidator;
