import { Request, Response, NextFunction } from "express";

// TODO: Сделать валидацию
function DeleteMenuValidator(req: Request, res: Response, next: NextFunction) {
	next();
}

export default DeleteMenuValidator;