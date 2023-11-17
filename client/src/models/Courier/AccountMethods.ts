import mongoose from "mongoose";
import TokenService from "../../Service/TokenService";
import { IAccountInformation } from "../../interface/Account/Account";
import { EnumRole } from "../../interface/Account/Role";
import { ICourier } from "../../interface/Courier/Courier";
import Log from "../../Service/Log";

export async function AccountMethods(schema: mongoose.Schema) {
	schema.statics.findAccountByLogin = async function (login: string) {
		Log.infoStack("Courier.findAccountByLogin");
		return this.findOne({ login });
	};

	schema.statics.findAccountByEmail = async function (email: string) {
		Log.infoStack("Courier.findAccountByEmail");
		return this.findOne({ email });
	};

	schema.statics.findAccountByToken = async function (token: string) {
		Log.infoStack("Courier.findAccountByToken");
		const { login } = TokenService.decodeToken(
			token
		) as IAccountInformation;
		return this.findOne({ login });
	};

	schema.statics.createAccount = async function (courierData: ICourier) {
		Log.infoStack("Courier.createAccount");
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

	schema.methods.generateToken = async function () {
		Log.infoStack("Courier.generateToken");
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
}
