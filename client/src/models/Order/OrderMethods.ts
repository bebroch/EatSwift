import mongoose, { ObjectId } from "mongoose";
import { FindOrderMethods } from "./FindMethods";
import { UpdateStatus } from "./UpdateStatus";
import { CreateMethod } from "./CreateMethod";

export function OrderMethods(schema: mongoose.Schema) {
	FindOrderMethods(schema);
	UpdateStatus(schema);
	CreateMethod(schema);

}
