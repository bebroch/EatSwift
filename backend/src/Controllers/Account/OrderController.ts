import { Request, Response } from "express";
import { getUser } from "../../Services/getBody";
import Status from "../../Services/Status";

class OrderController {
	// Показать историю заказов пользователя
	async getOrderHistory(req: Request, res: Response) {
		const user = await getUser(req);
		const orders = user.getOrders();

		return Status.success(res, orders);
	}

	// Создать заказ пользователя
	async createOrder(req: Request, res: Response) {
		const user = await getUser(req);
	}
}

export default new OrderController();
