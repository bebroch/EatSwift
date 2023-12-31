import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import ExceptionService from "../../Service/ExceptionService";
import GetData from "../../Service/GetData";
import Status from "../../Service/Status";
import OrderTypes from "../../Types/OrderTypes";
import { IUserFunctions } from "../../interface/User/User";
import { Request, Response } from "express";

async function formatterOrders(orders: OrderTypes.GetDataForDetails[] | null) {
	const orderWithDetails = await DetailsService.Order.get(orders);
	const ordersDataFormatted = DataFormatter.Order.get(orderWithDetails);
	return ordersDataFormatted;
}

// Показать историю заказов пользователя
async function getHistoryOfOrder(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;

	try {
		const orders = await user.getHistoryOfOrders();
		const ordersDataFormatted = await formatterOrders(orders);
		return Status.success(res, ordersDataFormatted);
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

async function getActiveOrders(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;

	try {
		const orders = await user.getActiveOrders();
		const ordersDataFormatted = await formatterOrders(orders);
		return Status.success(res, ordersDataFormatted);
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
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
		return ExceptionService.handle(res, err.message);
	}
}

async function cancelOrder(req: Request, res: Response) {
	const user = GetData.User.get(req) as IUserFunctions;
	const orderData = GetData.Order.get(req);

	try {
		await user.cancelOrder(orderData);
		return Status.success(res, SUCCESS_MESSAGE.ORDER_CANCELLED);
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

export const UserOrderController = {
	getHistoryOfOrder,
	getActiveOrders,
	makeOrder,
	cancelOrder,
};
