import mongoose, { ObjectId } from "mongoose";
import { IUser, IUserModel } from "../interface/User/User";
import { decodeToken, generateToken } from "../Services/Jwt";
import Order from "./Order";
import Dish from "./Dish";
import ERROR_MESSAGES from "../Message/Errors";
import { hashingPassword } from "../Services/Password";
import { EnumRole } from "../interface/Account/Role";

const UserSchema = new mongoose.Schema(
	{
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

UserSchema.statics.findUserByLogin = async function (login: string) {
	return this.findOne({ login });
};

UserSchema.statics.findUserByEmail = async function (email: string) {
	return this.findOne({ email });
};

UserSchema.statics.findUserWithToken = async function (token: string) {
	const userData = (await decodeToken(token)) as IUser;
	return this.findOne(userData);
};

UserSchema.statics.createAccount = async function (userData: IUser) {
	const { login, email, password } = userData;

	const passwordHash = await hashingPassword(password);

	const user = new this({
		login,
		email,
		password: passwordHash,
	});

	return user.save();
};

UserSchema.methods.generateToken = async function () {
	const { login, email } = this;

	const restaurantData = {
		login,
		email,
		role: EnumRole.User,
	};

	const token = await generateToken(restaurantData);

	return token;
};

UserSchema.methods.getCart = async function () {
	return this.cart;
};

UserSchema.methods.getOrders = async function () {
	const orders = await Order.find({ user_id: this._id });
	return orders;
};

UserSchema.methods.addToCart = async function (item_id: ObjectId) {
	const dishExists = await Dish.findById(item_id);
	if (!dishExists) {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
	}

	this.cart.push(item_id);
	this.save();
};

UserSchema.methods.deleteItemFromCart = async function (dish_id: ObjectId) {
	const dishExists = await Dish.findById(dish_id);

	if (!dishExists) {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
	}

	const itemIndex = this.cart.indexOf(dish_id);

	if (itemIndex !== -1) {
		this.cart.splice(itemIndex, 1);
		this.save();
	} else {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
	}
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
