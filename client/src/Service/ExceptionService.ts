import { Response } from "express";
import Status from "./Status";
import ERROR_MESSAGES from "../Message/Errors";
import Log from "./Log";

class ExceptionService {
	handle(res: Response, message: string) {
		const error = Object.values(ERROR_MESSAGES).find(
			error => error.message === message
		);

		if (!error) {
			Log.warn(message);
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}

		switch (error.statusCode) {
			case 400:
				Log.info(error.message);
				return Status.badRequest(res, error);
			case 401:
				Log.warn(error.message);
				return Status.unauthorized(res, error);
			case 403:
				Log.warn(error.message);
				return Status.forbidden(res, error);
			case 404:
				Log.warn(error.message);
				return Status.notFound(res, error);
			case 500:
				Log.error(error.message);
				return Status.internalError(res, error);
		}

		Log.error(error.message);
	}
}

export default new ExceptionService();
