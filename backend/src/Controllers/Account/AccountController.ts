import { Request, Response } from "express";
import Status from "../../Services/Status";
import { getUser } from "../../Services/getBody";

class AccountController {
	async index(req: Request & { user?: any }, res: Response) {
		const user = await getUser(req);

		Status.success(res, { user: user });
	}
}

export default new AccountController();
