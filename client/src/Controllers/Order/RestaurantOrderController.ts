import { Request, Response } from "express";
import GetData from "../../Service/GetData";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import { RestaurantLoginData } from "../../Service/Validation/Login/RestaurantLoginData";
import Status from "../../Service/Status";
import OrderTypes from "../../Types/OrderTypes";

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

	const orders = await restaurant.getHistoryOfOrders();

	console.log(orders);

	const ordersDataFormatted = await formatterOrders(orders);
	console.log(ordersDataFormatted);
	return Status.success(res, ordersDataFormatted);
}

async function getActiveOrders(req: Request, res: Response) {
	const restaurant = GetData.Restaurant.getPrivate(
		req
	) as IRestaurantFunctions;

	const orders = await restaurant.getActiveOrders();
	const ordersDataFormatted = await formatterOrders(orders);
	return Status.success(res, ordersDataFormatted);
}

async function updateOrder(req: Request, res: Response) {}

export const RestaurantOrderController = {
	getHistoryOfOrders,
	getActiveOrders,
	updateOrder,
};
