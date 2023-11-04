import mongoose from "mongoose";
import { decodeToken, generateToken } from "../../Services/Internet/Jwt";
import { hashingPassword } from "../../Services/Password";
import { IAccountInformation } from "../../interface/Account/Account";
import { EnumRole } from "../../interface/Account/Role";
import { IRestaurant } from "../../interface/Restaurant/Restaurant";

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

	schema.methods.generateToken = async function () {
		const { name, login, email } = this;

		const restaurantData = {
			name,
			login,
			email,
			role: EnumRole.Restaurant,
		};

		return await generateToken(restaurantData);
	};

	schema.statics.findAccountByToken = async function (token: string) {
		const { login } = (await decodeToken(token)) as IAccountInformation;
		return await this.findOne({ login });
	};
}
