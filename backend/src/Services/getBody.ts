import { Request } from "express";
import { IUser } from "../interface/User";

function getToken(req: Request & { user?: any }) {
	if (req.headers.authorization)
		return (req.headers.authorization as string).split(" ")[1];
	return null;
}

function getUser(req: Request & { user?: any }) {
	return req.user;
}

function getItem(req: Request) {
	return req.body.dish;
}

export { getToken, getUser, getItem };
