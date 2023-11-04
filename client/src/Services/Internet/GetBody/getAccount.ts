import { IAccount, IAccountFunction } from "../../../interface/Account/Account";
import { Request } from "express";

async function getAccount(
	req: Request & { account?: IAccount }
): Promise<IAccountFunction> {
	return req.account as IAccountFunction;
}

export default getAccount;
