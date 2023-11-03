import { TAccount } from "../../../../interface/Account/Account";
import ILoginData from "../../../../interface/LoginInterface/AccountData";
import { Request } from "express";

async function getLoginData(
	req: Request & { account?: TAccount }
): Promise<ILoginData> {
	const { login, password, role } = req.body;
	const account = req.account as TAccount;
	return { account, login, password, role };
}

export default getLoginData;
