import { Request, Response } from "express";
import Status from "../../Service/Status";
import { IUserFunctions } from "../../interface/User/User";
import GetData from "../../Service/GetData";

class OrderController {
	// Показать историю заказов пользователя // TODO: Доделать Просмотр заказов
	async getOrderHistory(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const orders = user.getOrders();

		return Status.success(res, orders);
	}

	// TODO: Сделать оформление заказа
	async makeOrder(req: Request, res: Response) {
		const user = GetData.User.get(req);

		return Status.success(res, "Make Order");
	}

	// Создать заказ пользователя // TODO: Сделать оформление заказа
	async createOrder(req: Request, res: Response) {
		const user = GetData.User.get(req);
	}
}

export default new OrderController();
