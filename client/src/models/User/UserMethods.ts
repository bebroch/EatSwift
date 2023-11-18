import mongoose from "mongoose";
import { DataMethods } from "./DataMethods";
import { CartMethods } from "./CartMethods";
import { AccountMethods } from "./AccountMethods";
import { OrderMethods } from "./OrderMethods";
import { RatingMethods } from "./RatingMethods";

export function UserMethods(schema: mongoose.Schema) {
	AccountMethods(schema);
	DataMethods(schema);
	CartMethods(schema);
	OrderMethods(schema);
	RatingMethods(schema);
}
