import mongoose, { Model } from "mongoose";
import { IOrder, OrderStatus } from "../interface/User/Order";
import OrderSchema from "./Order/OrderSchema";

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
