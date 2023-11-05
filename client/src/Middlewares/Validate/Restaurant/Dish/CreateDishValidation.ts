import { Request, Response, NextFunction } from "express";

// TODO: Сделать валидацию
function CreateDishValidator(req: Request, res: Response, next: NextFunction) {
    next();
}

export default CreateDishValidator;
