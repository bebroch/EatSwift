import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { IUserFunctions } from "../../interface/User/User";
import { IAccount } from "../../interface/Account/Account";
import DataFormatterUser from "../../Services/DatabaseServices/Data/Formatter/User/DataFormatterUser";

class UserAccountController {
	async index(
		req: Request & { account?: IAccount; login?: string },
		res: Response
	) {
		const user = getUser(req) as IUserFunctions;
		const userWithCart = await user.getUserDataWithCart();

		

		const userData = DataFormatterUser.getUserData(userWithCart);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new UserAccountController();
