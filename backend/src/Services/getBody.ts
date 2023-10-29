import { IUser } from "../interface/User";
import { Request } from "express";

async function getToken(req: Request & { user?: any }) {
	return (req.headers.authorization as string).split(" ")[1];
}

async function getUser(req: Request & { user?: any }) {
	return req.user;
}

export { getToken };
