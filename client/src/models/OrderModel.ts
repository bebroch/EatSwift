import mongoose, { Model } from "mongoose";
import { IOrder, IOrderModel, OrderStatus } from "../interface/User/Order";
import OrderSchema from "./Order/OrderSchema";

const Order = mongoose.model<IOrder, IOrderModel>("Order", OrderSchema);

export default Order;
