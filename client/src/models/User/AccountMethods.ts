import mongoose from "mongoose";
import { EnumRole } from "../../interface/Account/Role";
import { IUser } from "../../interface/User/User";
import TokenService from "../../Service/TokenService";
import Log from "../../Service/Log";

export function AccountMethods(schema: mongoose.Schema) {
	schema.statics.findAccountByLogin = async function (login: string) {
		Log.infoStack("User.findAccountByLogin");
		return this.findOne({ login });
	};

	schema.statics.findAccountByEmail = async function (email: string) {
		Log.infoStack("User.findAccountByEmail");
		return this.findOne({ email });
	};

	schema.statics.findAccountByToken = async function (token: string) {
		Log.infoStack("User.findAccountByToken");
		const { login } = TokenService.decodeToken(token) as { login: string };
		return this.findOne({ login });
	};

	schema.statics.createAccount = async function (userData: IUser) {
		Log.infoStack("User.createAccount");
		const { login, email, password } = userData;

		const passwordHash = await TokenService.hashingPassword(password);

		const user = new this({
			login,
			email,
			password: passwordHash,
		});

		return user.save();
	};

	schema.statics.updateAccount = async function (userData: IUser) {
		Log.infoStack("User.updateAccount");
	};

	schema.methods.generateToken = async function () {
		Log.infoStack("User.generateToken");
		const { login, email } = this;

		const restaurantData = {
			login,
			email,
			role: EnumRole.User,
		};

		const token = TokenService.generateToken(restaurantData);

		return token;
	};
}
