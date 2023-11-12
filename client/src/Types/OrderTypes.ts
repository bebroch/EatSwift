import { ObjectId } from "mongoose";
import { IOrder, OrderStatus } from "../interface/User/Order";
import { ICartItem } from "../interface/User/User";
import CartTypes from "./CartTypes";

namespace OrderTypes {
	export type GetDataForCreate = IOrder;

	export type GetDataForDetails = {
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: ICartItem[];
		status: OrderStatus;
	};

	export type GetDataDetails = {
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: CartTypes.GetDataItemDetails[];
		status: OrderStatus;
    };

	export type outputDataForDetails = GetDataForDetails;

    export type outputDataDetails = GetDataDetails;
}

export default OrderTypes;
