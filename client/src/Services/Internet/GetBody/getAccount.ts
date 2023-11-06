import { IAccount, IAccountFunction } from "../../../interface/Account/Account";
import { Request } from "express";

function getAccount(req: Request & { account?: IAccount }) {
	return req.account;
}

export default getAccount;
