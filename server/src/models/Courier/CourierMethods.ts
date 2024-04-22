import mongoose from "mongoose";
import Order from "../OrderModel";
import { AccountMethods } from "./AccountMethods";
import { OrderMethods } from "./OrderMethods";

export async function CourierMethods(schema: mongoose.Schema) {
	AccountMethods(schema);
	OrderMethods(schema);
}
