import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import ClearDataService from "../../Services/DatabaseServices/Data/ClearData";
import getUser from "../../Services/Internet/GetBody/getUser";

class AccountController {
	async index(req: Request & { user?: any; login?: string }, res: Response) {
		const user = await getUser(req);

		const userData = await ClearDataService.getUserData(user);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new AccountController();
