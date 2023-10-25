import { Request, Response } from "express";

class AccountController {
	async index(req: Request, res: Response) {
		return res.status(200).send({
			message: "AccountController",
		});
	}
}

export default new AccountController();
