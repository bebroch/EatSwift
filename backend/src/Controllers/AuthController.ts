import { Request, Response } from "express";

class AuthController {
	async index(req: Request, res: Response) {
		return res.status(200).send({
			message: "AuthController",
		});
	}
}

export default new AuthController();
