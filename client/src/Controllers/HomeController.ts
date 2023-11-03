import { Request, Response } from "express";
import Status from "../Services/Internet/Status";

class HomeController {
	async index(req: Request, res: Response) {
		return Status.success(res, "Home Page");
	}
}

export default new HomeController();
