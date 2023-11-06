import mongoose from "mongoose";
import { DataMethods } from "./DataMethods";
import { CartMethods } from "./Cart";

export function UserMethods(schema: mongoose.Schema) {
	CartMethods(schema);
	DataMethods(schema);
	CartMethods(schema);
}
