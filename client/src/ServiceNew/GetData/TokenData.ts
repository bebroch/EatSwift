import { Request } from "express";

export const TokenData = {
	get(req: Request) {
		if (req.headers.authorization)
			return (req.headers.authorization as string).split(" ")[1];
		return null;
	},
};
