import { Response } from "express";

class Status {
	private response(res: Response, statusCode: number, message: any) {
		if (typeof message === "string") {
			return res.status(statusCode).json({ message });
		}

		return res.status(statusCode).json(message);
	}

	success(res: Response, message: any) {
		return this.response(res, 200, message);
	}

	badRequest(res: Response, error: any) {
		return this.response(res, 400, error.message);
	}

	unauthorized(res: Response, error: any) {
		return this.response(res, 401, error.message);
	}

	forbidden(res: Response, error: any) {
		return this.response(res, 403, error.message);
	}

	notFound(res: Response, error: any) {
		return this.response(res, 404, error.message);
	}

	conflict(res: Response, error: any) {
		return this.response(res, 409, error.message);
	}

	gone(res: Response, error: any) { 
		return this.response(res, 410, error.message);
	}

	internalError(res: Response, error: any) {
		return this.response(res, 500, error.message);
	}
}

export default new Status();
