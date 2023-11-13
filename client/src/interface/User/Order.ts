import { Model, ObjectId } from "mongoose";
import { ICart, ICartItem } from "./Cart";

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

interface IOrderModel extends Model<IOrder> {
	createCart(user_id: ObjectId): Promise<IOrder>;
}

export { IOrder, IOrderModel, OrderStatus };
