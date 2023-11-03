import { IUser, IUserFunctions } from "../../../interface/User/User";
import { Request } from "express";

async function getUser(
	req: Request & { account?: IUser }
): Promise<IUserFunctions> {
	return req.account as IUserFunctions;
}

export default getUser;
