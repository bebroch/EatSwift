import { Request, Response, NextFunction } from "express";
import ExceptionErrorService from "../../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../../Message/Errors";

export function UpdateProfileMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { name, description, addresses, contactInfo } = req.body;

	if (Array.isArray(addresses))
		ExceptionErrorService.handler(ERROR_MESSAGES.INVALID_ADDRESS);

	if (!name || !description || addresses.length === 0 || !contactInfo)
		ExceptionErrorService.handler(
			ERROR_MESSAGES.PROFILE_UPDATE_DATA_REQUIRED
		);

	next();
}
