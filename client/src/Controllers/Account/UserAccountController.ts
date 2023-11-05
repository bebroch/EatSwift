import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import FormatterData from "../../Services/DatabaseServices/Data/Formatter/DataFormatter";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { IUserFunctions } from "../../interface/User/User";
import { IAccount } from "../../interface/Account/Account";
import DataFormatterUser from "../../Services/DatabaseServices/Data/Formatter/DataFormatterUser";

class UserAccountController {
	async index(
		req: Request & { account?: IAccount; login?: string },
		res: Response
	) {
		const user = (await getUser(req)) as IUserFunctions;

		const userData = await DataFormatterUser.getUserData(user);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new UserAccountController();
