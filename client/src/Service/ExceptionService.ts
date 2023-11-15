import { Response } from "express";
import Status from "./Status";
import ERROR_MESSAGES from "../Message/Errors";

class ExceptionService {
	handle(res: Response, message: string) {
		const error = Object.values(ERROR_MESSAGES).find(
			error => error.message === message
		);

		if (!error) {
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		switch (error.statusCode) {
			case 400:
				return Status.badRequest(res, error);
			case 401:
				return Status.unauthorized(res, error);
			case 403:
				return Status.forbidden(res, error);
			case 404:
				return Status.notFound(res, error);
			case 500:
				return Status.internalError(res, error);
		}
	}
}

export default new ExceptionService();
