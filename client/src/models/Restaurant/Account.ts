import mongoose from "mongoose";
import { IAccountInformation } from "../../interface/Account/Account";
import { EnumRole } from "../../interface/Account/Role";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import TokenService from "../../Service/TokenService";
import { RestaurantTypes } from "../../Types/RestaurantTypes";
import Log from "../../Service/Log";

export function AccountMethods(schema: mongoose.Schema) {
	schema.statics.findAccountByLogin = async function (login: string) {
		Log.infoStack("Restaurant.findAccountByLogin");
		return this.findOne({ login });
	};

	schema.statics.findAccountByEmail = async function (email: string) {
		Log.infoStack("Restaurant.findAccountByEmail");
		return this.findOne({ email });
	};

	schema.statics.getRestaurants = async function () {
		const restaurants = await this.find();
		let restaurantsData: IRestaurantFunctions[] = [];

		for (const restaurant of restaurants) {
			restaurantsData.push(await restaurant.getRestaurantData());
		}

		return restaurantsData;
	};

	schema.statics.createAccount = async function (
		restaurantData: IRestaurant
	) {
		Log.infoStack("Restaurant.createAccount");
		const { name, login, email, password } = restaurantData;

		const passwordHash = await TokenService.hashingPassword(password);

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

	schema.methods.generateToken = async function () {
		Log.infoStack("Restaurant.generateToken");
		const { name, login, email } = this;

		const restaurantData = {
			name,
			login,
			email,
			role: EnumRole.Restaurant,
		};

		return TokenService.generateToken(restaurantData);
	};

	schema.statics.findAccountByToken = async function (token: string) {
		Log.infoStack("Restaurant.findAccountByToken");
		const { login } = TokenService.decodeToken(
			token
		) as IAccountInformation;
		return await this.findOne({ login });
	};

	schema.methods.updateInfo = async function (
		updateData: RestaurantTypes.GetUpdateData
	) {
		Log.infoStack("Restaurant.updateInfo");
		const { name, description, addresses, contactInfo } = updateData;

		if (name) this.name = name;

		if (description) this.description = description;

		if (addresses) this.addresses = addresses;

		if (contactInfo) this.contactInfo = contactInfo;

		return this.save();
	};

	schema.methods.deleteAccount = async function () {
		await this.deleteOne({ _id: this._id });
	};
}
