import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import GetData from "../../Service/GetData";
import Status from "../../Service/Status";
import OrderTypes from "../../Types/OrderTypes";
import { IUserFunctions } from "../../interface/User/User";
import { Request, Response } from "express";

// TODO Может быть сделать отдельный класс для этого, такой же есть в RestaurantOrderController
async function formatterOrders(orders: OrderTypes.GetDataForDetails[] | null) {
	const orderWithDetails = await DetailsService.Order.get(orders);
	const ordersDataFormatted = DataFormatter.Order.get(orderWithDetails);
	return ordersDataFormatted;
}

// Показать историю заказов пользователя
async function getHistoryOfOrder(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;
	const orders = await user.getHistoryOfOrders();

	const ordersDataFormatted = await formatterOrders(orders);

	return Status.success(res, ordersDataFormatted);
}

async function getActiveOrders(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;
	const orders = await user.getActiveOrders();

	const ordersDataFormatted = await formatterOrders(orders);

	return Status.success(res, ordersDataFormatted);
}

async function makeOrder(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;
	const dataForMakeOrder = GetData.User.getDataForMakeOrder(req);

	try {
		const orderData = await user.makeOrder(dataForMakeOrder);
		const orderWithDetails = await DetailsService.Order.get(orderData);
		const orderDataFormatted = DataFormatter.Order.get(orderWithDetails);

		return Status.success(res, { order: orderDataFormatted });
	} catch (err: any) {
		if (err === ERROR_MESSAGES.ORDER_ALREADY_EXIST) {
			return Status.badRequest(res, ERROR_MESSAGES.ORDER_ALREADY_EXIST);
		}

		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}
}

async function cancelOrder(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;
	const orderData = GetData.Order.get(req);

	try {
		await user.cancelOrder(orderData);
		return Status.success(res, SUCCESS_MESSAGE.ORDER_CANCELLED);
	} catch (err: any) {
		// TODO Сделать отдельный класс для ошибок
		if (err.message === ERROR_MESSAGES.ORDER_NOT_FOUND)
			return Status.badRequest(res, ERROR_MESSAGES.ORDER_NOT_FOUND);
		if (err.message === ERROR_MESSAGES.ORDER_ALREADY_CANCELLED)
			return Status.badRequest(
				res,
				ERROR_MESSAGES.ORDER_ALREADY_CANCELLED
			);

		return Status.internalError(res, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
	}
}

export const UserOrderController = {
	getHistoryOfOrder,
	getActiveOrders,
	makeOrder,
	cancelOrder,
};
