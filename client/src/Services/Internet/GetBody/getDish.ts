import { ObjectId } from "mongoose";
import { Request } from "express";

async function getDish(req: Request): Promise<ObjectId> {
	return req.body.dish;
}

export { getDish };
