import mongoose from "mongoose";
import { IUser, IUserModel } from "../interface/User";
import { decodeToken } from "../Services/Jwt";
import Cart from "./Cart";
import { ICart } from "../interface/Cart";

const UserSchema = new mongoose.Schema(
	{
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
	},
	{ timestamps: true }
);

UserSchema.statics.findUserByLogin = async function (login: string) {
	return this.findOne({ login });
};

UserSchema.statics.findUserByEmail = async function (email: string) {
	return this.findOne({ email });
};

UserSchema.statics.findUserWithToken = async function (token: string) {
	const userData = await decodeToken(token);
	return this.findOne(userData);
};

UserSchema.statics.createUser = async function (userData: IUser) {
	const user = new this(userData);
	return user.save();
};

UserSchema.methods.getCart = async function () {
	const user_id = this.id;
	var cart = (await Cart.findOne({ user_id })) as ICart | null;

	if (!cart) {
		cart = await Cart.createCart(user_id);
	}

	return cart;
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
