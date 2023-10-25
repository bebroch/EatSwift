import { IUser } from "../interface/User";
import { Request } from "express";

async function getToken(req: Request & { user?: IUser }) {
	return (req.headers.authorization as string).split(" ")[1];
}

export { getToken };
