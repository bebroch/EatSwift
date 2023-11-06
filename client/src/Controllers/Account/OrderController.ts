import { Request, Response } from "express";
import Status from "../../Services/Internet/Status";
import getUser from "../../Services/Internet/GetBody/getAccount";
import { IUserFunctions } from "../../interface/User/User";

class OrderController {
	// Показать историю заказов пользователя // TODO: Доделать Просмотр заказов
	async getOrderHistory(req: Request, res: Response) {
		const user = (await getUser(req)) as IUserFunctions;
		const orders = user.getOrders();

		return Status.success(res, orders);
	}

	// TODO: Сделать оформление заказа
	async makeOrder(req: Request, res: Response) {
		const user = await getUser(req);

		return Status.success(res, "Make Order");
	}

	// Создать заказ пользователя // TODO: Сделать оформление заказа
	async createOrder(req: Request, res: Response) {
		const user = await getUser(req);
	}
}

export default new OrderController();
