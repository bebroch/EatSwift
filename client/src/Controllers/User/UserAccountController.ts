import { Request, Response } from "express";
import Status from "../../Service/Status";
import { IAccount } from "../../interface/Account/Account";
import { IUserFunctions } from "../../interface/User/User";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import ExceptionService from "../../Service/ExceptionService";
import { UserTypes } from "../../Types/UserTypes";
import { Logger } from "winston";
import Log from "../../Service/Log";

class UserAccountController {
	async index(
		req: Request & { account?: IAccount; login?: string },
		res: Response
	) {
		const user = GetData.User.get(req) as IUserFunctions;
		try {
			const userWithCart = await user.getUserDataWithCart();
			const userDataDetails = await DetailsService.User.get(userWithCart);
			const userData = DataFormatter.User.get(userDataDetails);

			return Status.success(res, {
				user: userData,
			});
		} catch (err: any) {
			return ExceptionService.handle(res, err.message);
		}
	}
}

export default new UserAccountController();
