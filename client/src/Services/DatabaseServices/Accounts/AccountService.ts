import {
	IAccountInformation,
	TAccount,
} from "../../../interface/Account/Account";
import { EnumRole } from "../../../interface/Account/Role";
import Courier from "../../../models/Courier";
import Restaurant from "../../../models/Restaurant";
import User from "../../../models/User";
import executeFunctionBasedOnRole from "../../ExecuteFunctionBasedOnRole";
import { decodeToken } from "../../Internet/Jwt";

async function getAccountWithToken(token: string) {
	const accountData = await decodeToken(token);

	if (!accountData) {
		return null;
	}

	const account = await getAccount(accountData);

	return account;
}

async function getAccount(account: IAccountInformation): Promise<TAccount> {
	return executeFunctionBasedOnRole(account.role, {
		user: async () => {
			return await User.findOne({ login: account.login });
		},
		restaurant: async () => {
			return await Restaurant.findOne({ login: account.login });
		},
		courier: async () => {
			return await Courier.findOne({ login: account.login });
		},
	});
}

export { getAccountWithToken, getAccount };
