import mongoose from "mongoose";
import { ICourier, ICourierModel } from "../interface/Courier";
import { decodeToken } from "../Services/Jwt";
import Order from "./Order";

const CourierSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
        lastName: { type: String, required: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
	},
	{ timestamps: true }
);

CourierSchema.statics.findCourierByLogin = async function (login: string) {
	return this.findOne({ login });
};

CourierSchema.statics.findCourierByEmail = async function (email: string) {
	return this.findOne({ email });
};

CourierSchema.statics.findCourierWithToken = async function (token: string) {
	const courierData = (await decodeToken(token)) as ICourier;
	return this.findOne(courierData);
};

CourierSchema.statics.createCourier = async function (courierData: ICourier) {
	const courier = new this(courierData);
	return courier.save();
};

CourierSchema.methods.getOrder = async function () {
	const orders = await Order.find({ courier_id: this._id });
	return orders;
};

const Courier = mongoose.model<ICourier, ICourierModel>(
	"Courier",
	CourierSchema
);

export default Courier;
