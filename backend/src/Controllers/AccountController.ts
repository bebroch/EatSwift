import { Request, Response } from "express";
import Status from "../Services/Status";
import { IUser } from "../interface/User";

class AccountController {
	async index(req: Request & { user?: any }, res: Response) {
		const user = getUser(req);

		Status.success(res, { user: user });
	}

	async orders(req: Request, res: Response) {
		const user = getUser(req);
	}

	async order(req: Request, res: Response) {
		const user = getUser(req);
	}

	async createOrder(req: Request, res: Response) {
		const user = getUser(req);
	}

	async getCart(req: Request, res: Response) {
		const user = getUser(req);
	}

	async addToCart(req: Request, res: Response) {
		const user = getUser(req);
	}

	async deleteItemFromCart(req: Request, res: Response) {
		const user = getUser(req);
	}
}

export default new AccountController();
function getUser(
	req: Request<
		import("express-serve-static-core").ParamsDictionary,
		any,
		any,
		import("qs").ParsedQs,
		Record<string, any>
	> & { user?: any }
) {
	throw new Error("Function not implemented.");
}
