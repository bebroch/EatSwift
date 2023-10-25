import { Request, Response } from "express";
import Status from "../Services/Status";

class MenuController {
	async index(req: Request, res: Response) {
		Status.success(res, "MenuController");
	}
}

export default new MenuController();
