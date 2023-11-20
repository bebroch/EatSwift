import { Request, Response, NextFunction } from "express";
import ExceptionErrorService from "../../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../../Message/Errors";
import Status from "../../../Service/Status";

export function UpdateProfileMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { name, description, addresses, contactInfo } = req.body;

	if (!Array.isArray(addresses))
		return Status.badRequest(res, ERROR_MESSAGES.INVALID_ADDRESS);

	if (!name || !description || addresses.length === 0 || !contactInfo)
		return Status.badRequest(
			res,
			ERROR_MESSAGES.PROFILE_UPDATE_DATA_REQUIRED
		);

	next();
}
