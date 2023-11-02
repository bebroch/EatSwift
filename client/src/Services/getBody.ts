import { Request } from "express";
import { IUser, IUserFunctions } from "../interface/User/User";
import User from "../models/User";
import { IRegisterData } from "../interface/RegisterInterface/RegisterData";
import ILoginData from "../interface/LoginInterface/AccountData";
import { TAccount } from "../interface/Account/Account";
import { IDish } from "../interface/Restaurant/Dish";
import { ObjectId } from "mongoose";

async function getToken(req: Request & { user?: IUser }) {
	if (req.headers.authorization)
		return (req.headers.authorization as string).split(" ")[1];
	return null;
}

async function getUser(
	req: Request & { account?: IUser }
): Promise<IUserFunctions> {
	return req.account as IUserFunctions;
}

async function getUserProfile(req: Request & { user?: IUser; login?: string }) {
	const login = req.login;

	if (!login) return null;

	const user = await User.findAccountByLogin(login);

	return user;
}

async function getRegisterData(req: Request): Promise<IRegisterData> {
	return req.body;
}

async function getItem(req: Request): Promise<ObjectId> {
	return req.body.item;
}

async function getLoginData(
	req: Request & { account?: TAccount }
): Promise<ILoginData> {
	const { login, password, role } = req.body;
	const account = req.account as TAccount;
	return { account, login, password, role };
}

export {
	getToken,
	getUser,
	getUserProfile,
	getRegisterData,
	getItem,
	getLoginData,
};
