import mongoose from "mongoose";
import { DataMethods } from "./DataMethods";
import { CartMethods } from "./Cart";
import { AccountMethods } from "./AccountMethods";

export function UserMethods(schema: mongoose.Schema) {
	AccountMethods(schema);
	DataMethods(schema);
	CartMethods(schema);
}
