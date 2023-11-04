import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import ClearDataService from "../../Services/DatabaseServices/Data/ClearData";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { IUserFunctions } from "../../interface/User/User";
import { IAccount } from "../../interface/Account/Account";

class UserAccountController {
	async index(
		req: Request & { account?: IAccount; login?: string },
		res: Response
	) {
		const user = (await getUser(req)) as IUserFunctions;

		const userData = await ClearDataService.getUserData(user);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new UserAccountController();
