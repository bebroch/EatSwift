import { Request, Response, NextFunction } from "express";

// TODO Сделать валидацию
export function UpdateProfileMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
    next();
}
