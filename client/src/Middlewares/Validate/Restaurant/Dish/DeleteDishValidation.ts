import { Request, Response, NextFunction } from "express";

// TODO: Сделать валидацию
function DeleteDishValidator(req: Request, res: Response, next: NextFunction) {
	next();
}

export default DeleteDishValidator;
