import { Model, ObjectId } from "mongoose";
import { ICartItem } from "./Cart";
import OrderTypes from "../../Types/OrderTypes";
import { OrderModel } from "../../Enums/Order/OrderModels";
import { OrderStatus } from "../../Enums/Order/OrderStatus";

interface IOrder {
	_id: ObjectId;
	user_id: ObjectId;
	courier_id: ObjectId;
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

	findActiveOrdersForCourier(): Promise<IOrder[]>;

	findHistoryByModel(
		model_id: ObjectId,
		model: OrderModel
	): Promise<IOrder[]>;
	findActiveByModel(model_id: ObjectId, model: OrderModel): Promise<IOrder[]>;

	findUserActiveOrders(user_id: ObjectId): Promise<IOrder[]>;
	findUserHistoryOfOrders(user_id: ObjectId): Promise<IOrder[]>;
	findRestaurantActiveOrders(restaurant_id: ObjectId): Promise<IOrder[]>;
	findRestaurantHistoryOfOrders(restaurant_id: ObjectId): Promise<IOrder[]>;
	findCourierActiveOrders(courier_id: ObjectId): Promise<IOrder[]>;
	findCourierHistoryOfOrders(courier_id: ObjectId): Promise<IOrder[]>;
}

export { IOrder, IOrderFunctions, IOrderModel };
