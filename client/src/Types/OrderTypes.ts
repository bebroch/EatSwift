import { ObjectId } from "mongoose";
import { IOrder, OrderStatus } from "../interface/User/Order";
import { ICartItem } from "../interface/User/User";
import CartTypes from "./CartTypes";

namespace OrderTypes {
	export type GetDataForCreate = IOrder;

	export type GetDataForDetails = {
		_id: ObjectId;
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: ICartItem[];
		status: OrderStatus;
	};

	export type outputDataForDetails = GetDataForDetails;

	export type GetDataDetails = {
		_id: ObjectId;
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: CartTypes.GetDataItemDetails[];
		status: OrderStatus;
	};

	export type outputDataDetails = GetDataDetails;

	export type GetDataForFindOne = {
		order_id: string | ObjectId;
	};

	export type GetDataForCancel = GetDataForFindOne;

	export type GetDataForUpdate = GetDataForFindOne & {
		status: string | OrderStatus;
	};
}

export default OrderTypes;
