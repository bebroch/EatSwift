import { Request, Response } from "express";

class HomeController {
	async index(req: Request, res: Response) {
		return res.status(200).send({
			message: "Hello World!",
		});
	}
}

export default new HomeController();
