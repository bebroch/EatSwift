import { Request, Response } from "express";
import Status from "../../Services/Status";
import { getUser, getUserProfile } from "../../Services/getBody";
import { IUser } from "../../interface/User";

class AccountController {
	// TODO Нужно доделать аутентификацию
	async index(req: Request & { user?: any; login?: string }, res: Response) {
		console.log(req.login);
		return Status.success(res, req.params.login);

		const user = getUser(req) as IUser;
		const userProfile = getUserProfile(req);

		const userData = getUserDataService(user);

		return Status.success(res, "Hello"); // { user: userData });
	}
}

export default new AccountController();
