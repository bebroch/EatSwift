import { Request, Response } from "express";
import Status from "../../ServiceNew/Status";
import { IAccount } from "../../interface/Account/Account";
import { IUserFunctions } from "../../interface/User/User";
import GetData from "../../ServiceNew/GetData";
import DataFormatter from "../../ServiceNew/DataFormatter";

class UserAccountController {
	async index(
		req: Request & { account?: IAccount; login?: string },
		res: Response
	) {
		const user = GetData.User.get(req) as IUserFunctions;
		const userWithCart = await user.getUserDataWithCart();

		const userData = DataFormatter.User.get(userWithCart);

		return Status.success(res, {
			user: userData,
		});
	}
}

export default new UserAccountController();
