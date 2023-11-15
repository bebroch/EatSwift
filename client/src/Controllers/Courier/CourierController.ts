import { Request, Response } from "express";
import Status from "../../Service/Status";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import { ICourierFunctions } from "../../interface/Courier/Courier";
import Order from "../../models/OrderModel";
import { IOrder, IOrderFunctions } from "../../interface/User/Order";
import DetailsService from "../../Service/DetailsService";

class CourierController {
	async getPublicCourierProfile(req: Request, res: Response) {
		const courier = GetData.Courier.getPublic(req) as ICourierFunctions;
		const courierDataFormatted = DataFormatter.Courier.get(courier);
		return Status.success(res, courierDataFormatted);
	}

	async getPrivateCourierProfile(req: Request, res: Response) {
		const courier = GetData.Courier.getPrivate(req) as ICourierFunctions;
		const courierDataFormatted = DataFormatter.Courier.get(courier);
		return Status.success(res, courierDataFormatted);
	}

	async getActiveOrders(req: Request, res: Response) {
		const orders = (await Order.findActiveOrdersForCourier()) as IOrder[];

		const orderWithDetails = await DetailsService.Order.get(orders);
		const courierDataFormatted = DataFormatter.Order.get(orderWithDetails);

		return Status.success(res, { order: courierDataFormatted });
	}

	async getActiveOrder(req: Request, res: Response) {
		const courier = GetData.Courier.getPrivate(req) as ICourierFunctions;
		const order = await courier.getActiveOrder();
		const orderWithDetails = await DetailsService.Order.get(order);
		const orderDataFormatted = DataFormatter.Order.get(orderWithDetails);
		return Status.success(res, orderDataFormatted);
	}

	async takeActiveOrder(req: Request, res: Response) {
		const orderData = GetData.Order.getForTakeOrder(req);
		const courier = GetData.Courier.getPrivate(req) as ICourierFunctions;

		try {
			const order = await courier.takeOrder(orderData);
			const orderWithDetails = await DetailsService.Order.get(order);
			const orderFormattedData =
				DataFormatter.Order.get(orderWithDetails);
			return Status.success(res, orderFormattedData);
		} catch (err: any) {
			// TODO Сделать сервис
			return Status.internalError(res, err.message);
		}
	}

	async updateStatusOrder(req: Request, res: Response) {
		const courier = GetData.Courier.getPrivate(req) as ICourierFunctions;
		const statusData = GetData.Order.getForUpdateStatus(req);

		try {
			const orderData = await courier.updateStatus(statusData);
			const orderWithDetails = await DetailsService.Order.get(orderData);
			const orderDataFormatted =
				DataFormatter.Order.get(orderWithDetails);

			return Status.success(res, orderDataFormatted);
		} catch (err: any) {
			// TODO Сделать сервис
			return Status.internalError(res, err.message);
		}
	}

	async getOrderFromHistory(req: Request, res: Response) {}

	async getHistoryOfOrders(req: Request, res: Response) {}
}

export default new CourierController();