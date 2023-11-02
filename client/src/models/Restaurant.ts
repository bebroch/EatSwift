import mongoose from "mongoose";
import {
	IRestaurant,
	IRestaurantModel,
} from "../interface/Restaurant/Restaurant";
import { decodeToken, generateToken } from "../Services/Jwt";
import { hashingPassword } from "../Services/Password";
import { EnumRole } from "../interface/Account/Role";
import { IAccountInformation } from "../interface/Account/Account";

const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		description: { type: String, required: false },
		address: [{ type: String, required: false }],
		contactInfo: { type: String, required: false },
		rating: { type: Number, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

RestaurantSchema.statics.findAccountByLogin = async function (login: string) {
	return this.findOne({ login });
};

RestaurantSchema.statics.findAccountByEmail = async function (email: string) {
	return this.findOne({ email });
};

RestaurantSchema.statics.createAccount = async function (
	restaurantData: IRestaurant
) {
	const { name, login, email, password } = restaurantData;

	const passwordHash = await hashingPassword(password);

	const restaurant = new this({
		name,
		login,
		email,
		rating: 0,
		password: passwordHash,
		verified: false,
	});

	return restaurant.save();
};

RestaurantSchema.methods.generateToken = async function () {
	const { name, login, email } = this;

	const restaurantData = {
		name,
		login,
		email,
		role: EnumRole.Restaurant,
	};

	return await generateToken(restaurantData);
};

RestaurantSchema.statics.findAccountWithToken = async function (token: string) {
	const { login } = (await decodeToken(token)) as IAccountInformation;
	return await this.findOne({ login });
};

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
