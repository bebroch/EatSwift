import { Request, Response } from "express";
import Status from "../../Service/Status";
import { IUserFunctions } from "../../interface/User/User";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import ERROR_MESSAGES from "../../Message/Errors";

class OrderController {
	// Показать историю заказов пользователя // TODO: Доделать Просмотр заказов
	async getOrderHistory(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const orders = user.getOrders();

		return Status.success(res, orders);
	}

	// TODO: Сделать оформление заказа
	async makeOrder(req: Request, res: Response) {
		const user = GetData.User.get(req) as IUserFunctions;
		const dataForMakeOrder = GetData.User.getDataForMakeOrder(req);

		try {
			const orderData = await user.makeOrder(dataForMakeOrder);
			const orderWithDetails = await DetailsService.Order.get(orderData);
			const orderDataFormatted =
				DataFormatter.Order.get(orderWithDetails);

			return Status.success(res, { order: orderDataFormatted });
		} catch (err: any) {
			if (err === ERROR_MESSAGES.ORDER_ALREADY_EXIST) {
				return Status.badRequest(
					res,
					ERROR_MESSAGES.ORDER_ALREADY_EXIST
				);
			}

			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}
	}

	// Создать заказ пользователя // TODO: Сделать оформление заказа
	async getOrderFromHistory(req: Request, res: Response) {
		const user = GetData.User.get(req);
	}
}

export default new OrderController(); // 2
