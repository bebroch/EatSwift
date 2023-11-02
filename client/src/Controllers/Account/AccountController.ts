import { Request, Response } from "express";
import Status from "../../Services/Status";
import { getUser } from "../../Services/getBody";
import { getUserDataService } from "../../Services/getUserDataService";

class AccountController {
	async index(req: Request & { user?: any; login?: string }, res: Response) {
		const user = await getUser(req);

		const userData = await getUserDataService(user);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new AccountController();
