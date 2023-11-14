import mongoose from "mongoose";
import { ICourier, ICourierModel } from "../interface/Courier/Courier";
import CourierSchema from "./Courier/CourierSchema";

const Courier = mongoose.model<ICourier, ICourierModel>(
	"Courier",
	CourierSchema
);

export default Courier;
