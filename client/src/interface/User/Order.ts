import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";

enum OrderStatus {
	active = "active",
	isProcessed = "isProcessed",
	delivered = "delivered",
	completed = "completed",
	canceled = "canceled",
}

interface IOrder extends Document, ICart {
	_id: ObjectId;
	user_id: ObjectId;
	status: OrderStatus;
}

interface IOrderModel extends Model<IOrder> {
	createCart(user_id: ObjectId): Promise<IOrder>;
}

export { IOrder, IOrderModel, OrderStatus };
