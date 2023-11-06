import { Request, Response, NextFunction } from "express";

// TODO: Сделать валидацию
function CreateMenuValidator(req: Request, res: Response, next: NextFunction) {
	next();
}

export default CreateMenuValidator;
