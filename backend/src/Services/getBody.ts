import { Request } from "express";
import { IUser, IUserFunctions } from "../interface/User";

function getToken(req: Request & { user?: IUser }) {
	if (req.headers.authorization)
		return (req.headers.authorization as string).split(" ")[1];
	return null;
}

function getUser(req: Request & { user?: IUser }): IUserFunctions {
	return req.user as IUserFunctions;
}

function getUserProfile(req: Request & { user?: IUser }) {
	console.log(req.params.login);
	return req.params.login;
}

function getItem(req: Request) {
	return req.body.dish;
}

export { getToken, getUser, getUserProfile, getItem };
