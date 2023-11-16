import { Request, Response } from "express";
import GetData from "../../Service/GetData";
import { IRestaurantFunctions } from "../../interface/Restaurant";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import Status from "../../Service/Status";
import OrderTypes from "../../Types/OrderTypes";
import ExceptionService from "../../Service/ExceptionService";
import ERROR_MESSAGES from "../../Message/Errors";

// TODO Может быть сделать отдельный класс для этого, такой же есть в UserOrderController
async function formatterOrders(orders: OrderTypes.GetDataForDetails[] | null) {
	const orderWithDetails = await DetailsService.Order.get(orders);
	const ordersDataFormatted = DataFormatter.Order.get(orderWithDetails);
	return ordersDataFormatted;
}

async function getHistoryOfOrders(req: Request, res: Response) {
	const restaurant = GetData.Restaurant.getPrivate(
		req
	) as IRestaurantFunctions;

	try {
		const orders = await restaurant.getHistoryOfOrders();
		const ordersDataFormatted = await formatterOrders(orders);
		return Status.success(res, ordersDataFormatted);
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

async function getActiveOrders(req: Request, res: Response) {
	const restaurant = GetData.Restaurant.getPrivate(
		req
	) as IRestaurantFunctions;

	try {
		const orders = await restaurant.getActiveOrders();
		const ordersDataFormatted = await formatterOrders(orders);
		return Status.success(res, ordersDataFormatted);
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

async function updateOrder(req: Request, res: Response) {
	const restaurant = GetData.Restaurant.getPrivate(
		req
	) as IRestaurantFunctions;

	const orderData = GetData.Order.getStatus(req);

	try {
		const order = await restaurant.updateOrder(orderData);
		const orderWithDetails = await DetailsService.Order.get(order);
		const orderDataFormatted = DataFormatter.Order.get(orderWithDetails);
		return Status.success(res, { order: orderDataFormatted });
	} catch (err: any) {
		return ExceptionService.handle(res, err.message);
	}
}

export const RestaurantOrderController = {
	getHistoryOfOrders,
	getActiveOrders,
	updateOrder,
};
