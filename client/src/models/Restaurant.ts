import mongoose from "mongoose";
import {
	IRestaurant,
	IRestaurantModel,
} from "../interface/Restaurant/Restaurant";
import { decodeToken, generateToken } from "../Services/Internet/Jwt";
import { hashingPassword } from "../Services/Password";
import { EnumRole } from "../interface/Account/Role";
import { IAccountInformation } from "../interface/Account/Account";
import Menu from "./Menu";
import ERROR_MESSAGES from "../Message/Errors";
import MenuSchema from "./Menu";
import { IMenu } from "../interface/Restaurant/Menu";


const RestaurantSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		description: { type: String, required: false },
		addresses: [{ type: String, required: false }],
		contactInfo: { type: String, required: false },
		rating: { type: Number, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		menu: [MenuSchema],
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

RestaurantSchema.statics.findAccountByToken = async function (token: string) {
	const { login } = (await decodeToken(token)) as IAccountInformation;
	return await this.findOne({ login });
};


RestaurantSchema.methods.createMenu = async function (menuData: IMenu) {

	this.menu.push(menuData);
	console.log(this.menu);

	this.save();

	return this.menu;
};

RestaurantSchema.methods.createDish = async function (dishData: any) {};

const Restaurant = mongoose.model<IRestaurant, IRestaurantModel>(
	"Restaurant",
	RestaurantSchema
);

export default Restaurant;
