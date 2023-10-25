import { Request, Response } from "express";
import Status from "../Services/Status";

class AccountController {
	async index(req: Request, res: Response) {
		Status.success(res, "AccountController");
	}
}

export default new AccountController();
