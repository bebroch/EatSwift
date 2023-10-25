import { Request, Response } from "express";

class MenuController {
	async index(req: Request, res: Response) {
		return res.status(200).send({
			message: "MenuController",
		});
	}
}

export default new MenuController();
