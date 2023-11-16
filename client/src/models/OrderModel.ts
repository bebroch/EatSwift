import mongoose from "mongoose";
import { IOrder, IOrderModel } from "../interface/Order";
import OrderSchema from "./Order/OrderSchema";

const Order = mongoose.model<IOrder, IOrderModel>("Order", OrderSchema);

export default Order;
