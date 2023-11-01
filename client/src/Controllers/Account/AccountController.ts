import { Request, Response } from "express";
import Status from "../../Services/Status";
import { getUser, getUserProfile } from "../../Services/getBody";
import {
	getUserDataService,
	getUserProfileDataService,
} from "../../Services/getUserDataService";
import ERROR_MESSAGES from "../../Message/Errors";

class AccountController {
	async index(req: Request & { user?: any; login?: string }, res: Response) {
		const user = getUser(req);
		const userProfile = await getUserProfile(req);

		if (!userProfile) {
			return Status.notFound(res, ERROR_MESSAGES.USER_NOT_FOUND);
		}

		const userData = getUserDataService(user);
		const userProfileData = getUserProfileDataService(userProfile);

		return Status.success(res, {
			user: userData,
			userProfile: userProfileData,
		});
	}
}

export default new AccountController();
