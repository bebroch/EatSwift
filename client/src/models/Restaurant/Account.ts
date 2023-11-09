import mongoose from "mongoose";
import { IAccountInformation } from "../../interface/Account/Account";
import { EnumRole } from "../../interface/Account/Role";
import { IRestaurant } from "../../interface/Restaurant/Restaurant";
import TokenService from "../../Service/TokenService";

export function AccountMethods(schema: mongoose.Schema) {
	schema.statics.findAccountByLogin = async function (login: string) {
		return this.findOne({ login });
	};

	schema.statics.findAccountByEmail = async function (email: string) {
		return this.findOne({ email });
	};

	schema.statics.createAccount = async function (
		restaurantData: IRestaurant
	) {
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
		const { login } = TokenService.decodeToken(
			token
		) as IAccountInformation;
		return await this.findOne({ login });
	};
}
