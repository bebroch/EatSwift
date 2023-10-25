import { Request, Response } from "express";
import User from "../models/User";
import Status from "../Services/Status";

class HomeController {
	async index(req: Request, res: Response) {
		Status.success(res, { hello: "Hello" });
	}
}

export default new HomeController();
