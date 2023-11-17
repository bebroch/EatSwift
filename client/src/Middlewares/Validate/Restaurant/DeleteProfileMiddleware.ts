import { Request, Response, NextFunction } from "express";

// TODO Сделать валидацию
export function DeleteProfileMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	next();
}
