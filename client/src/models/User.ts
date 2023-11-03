import mongoose from "mongoose";
import { ICartItem, IUser, IUserModel } from "../interface/User/User";
import { decodeToken, generateToken } from "../Services/Internet/Jwt";
import Order from "./Order";
import Dish from "./Dish";
import ERROR_MESSAGES from "../Message/Errors";
import { hashingPassword } from "../Services/Password";
import { EnumRole } from "../interface/Account/Role";
import { IDish } from "../interface/Restaurant/Dish";

const UserSchema = new mongoose.Schema<IUser, IUserModel>(
	{
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		cart: [
			{
				dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

UserSchema.statics.findAccountByLogin = async function (login: string) {
	return this.findOne({ login });
};

UserSchema.statics.findAccountByEmail = async function (email: string) {
	return this.findOne({ email });
};

UserSchema.statics.findAccountByToken = async function (token: string) {
	const { login } = (await decodeToken(token)) as { login: string };
	return this.findOne({ login });
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

UserSchema.methods.addToCart = async function (item: IDish) {
	const dish = await Dish.findOne(item);

	if (!dish) {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
	}

	const existingCartItemIndex = this.cart.findIndex((cartItem: ICartItem) => {
		return cartItem.dish.toString() === dish._id.toString();
	});

	if (existingCartItemIndex !== -1) {
		this.cart[existingCartItemIndex].quantity += 1;
	} else {
		this.cart.push({
			dish: dish._id,
			quantity: 1,
		});
	}

	return this.save();
};

UserSchema.methods.deleteItemFromCart = async function (item: IDish) {
	const dish = await Dish.findOne(item);

	if (!dish) {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
	}

	const itemIndex = this.cart.findIndex((cartItem: ICartItem) => {
		return cartItem.dish.toString() === dish._id.toString();
	});

	if (itemIndex !== -1) {
		this.cart[itemIndex].quantity -= 1;
		if (this.cart[itemIndex].quantity === 0) {
			this.cart.splice(itemIndex, 1);
		}
		this.save();
	} else {
		throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND_IN_CART);
	}
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
