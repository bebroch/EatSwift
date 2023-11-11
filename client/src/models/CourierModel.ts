import mongoose from "mongoose";
import { ICourier, ICourierModel } from "../interface/Courier/Courier";
import Order from "./OrderModel";
import { EnumRole } from "../interface/Account/Role";
import { IAccountInformation } from "../interface/Account/Account";
import TokenService from "../Service/TokenService";

const CourierSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		order: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
			required: false,
		},
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

CourierSchema.statics.findAccountByLogin = async function (login: string) {
	return this.findOne({ login });
};

CourierSchema.statics.findAccountByEmail = async function (email: string) {
	return this.findOne({ email });
};

CourierSchema.statics.findAccountByToken = async function (token: string) {
	const { login } = TokenService.decodeToken(token) as IAccountInformation;
	return this.findOne({ login });
};

CourierSchema.statics.createAccount = async function (courierData: ICourier) {
	const { firstName, lastName, login, email, password } = courierData;

	const passwordHash = await TokenService.hashingPassword(password);

	const courier = new this({
		firstName,
		lastName,
		login,
		email,
		password: passwordHash,
		verified: false,
	});

	return courier.save();
};

CourierSchema.methods.getOrder = async function () {
	const orders = await Order.find({ courier_id: this._id });
	return orders;
};

CourierSchema.methods.generateToken = async function () {
	const { firstName, lastName, login, email, password } = this;

	const restaurantData = {
		firstName,
		lastName,
		login,
		email,
		role: EnumRole.Restaurant,
	};

	return TokenService.generateToken(restaurantData);
};

const Courier = mongoose.model<ICourier, ICourierModel>(
	"Courier",
	CourierSchema
);

export default Courier;
