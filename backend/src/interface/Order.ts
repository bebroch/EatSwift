import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";

interface IOrder extends Document, ICart {
	_id: ObjectId;
	user_id: ObjectId;
	status: string;
}

interface IOrderModel extends Model<IOrder> {
	createCart(user_id: ObjectId): Promise<IOrder>;
}

export { IOrder, IOrderModel };
