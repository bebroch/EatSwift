import { Response } from "express";

class Status {
	Ok: any;
	private async response(res: Response, statusCode: number, message: any) {
		if (typeof message === "string") {
			return res.status(statusCode).json({ message });
		}

		return res.status(statusCode).json(message);
	}

	async success(res: Response, message: any) {
		return this.response(res, 200, message);
	}

	async badRequest(res: Response, message: any) {
		return this.response(res, 400, message);
	}

	async unauthorized(res: Response, message: any) {
		return this.response(res, 401, message);
	}

	async forbidden(res: Response, message: any) {
		return this.response(res, 403, message);
	}

	async notFound(res: Response, message: any) {
		return this.response(res, 404, message);
	}

	async internalError(res: Response, message: any) {
		return this.response(res, 500, message);
	}
}

export default new Status();
