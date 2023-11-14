import { Model, ObjectId } from "mongoose";
import { ICart, ICartItem } from "./Cart";
import OrderTypes from "../../Types/OrderTypes";

enum OrderStatus {
	active = "active",
	isProcessed = "isProcessed",
	delivered = "delivered",
	completed = "completed",
	canceled = "canceled",
}

interface IOrder {
	_id: ObjectId;
	user_id: ObjectId;
	restaurant_id: ObjectId;
	status: OrderStatus;
	item: ICartItem[];
}

interface IOrderFunctions extends IOrder {
	setOrderStatus(
		currentStatus: OrderStatus,
		futureStatus: OrderStatus
	): Promise<IOrder>;

	updateStatusIsProcessed(): Promise<IOrder>;
	updateStatusDelivered(): Promise<IOrder>;
	updateStatusCompleted(): Promise<IOrder>;
	updateStatusCanceled(): Promise<IOrder>;
}

interface IOrderModel extends Model<IOrderFunctions> {
	createOrder(data: OrderTypes.GetDataForCreate): Promise<IOrder>;

	findActiveOrders(_id: ObjectId): Promise<IOrder[]>;
	findHistoryOfOrders(_id: ObjectId): Promise<IOrder[]>;
}

export { IOrder, IOrderModel, OrderStatus };
