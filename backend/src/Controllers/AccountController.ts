import { Request, Response } from "express";
import Status from "../Services/Status";
import { getUser } from "../Services/getBody";

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
