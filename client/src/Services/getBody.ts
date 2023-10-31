import { Request } from "express";
import { IUser, IUserFunctions } from "../interface/User";
import User from "../models/User";
import { IRegisterData } from "../interface/RegisterInterface/RegisterData";
import { EnumRole } from "../interface/Role";

function getToken(req: Request & { user?: IUser }) {
	if (req.headers.authorization)
		return (req.headers.authorization as string).split(" ")[1];
	return null;
}

function getUser(req: Request & { user?: IUser }): IUserFunctions {
	return req.user as IUserFunctions;
}

async function getUserProfile(req: Request & { user?: IUser; login?: string }) {
	const login = req.login;

	if (!login) return null;

	const user = await User.findUserByLogin(login);

	return user;
}

async function getRegisterData(req: Request): Promise<IRegisterData> {
	return req.body;
}

function getItem(req: Request) {
	return req.body.dish;
}

export { getToken, getUser, getUserProfile, getRegisterData, getItem };
