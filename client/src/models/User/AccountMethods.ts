import mongoose from "mongoose";
import { EnumRole } from "../../interface/Account/Role";
import { IUser } from "../../interface/User/User";
import TokenService from "../../ServiceNew/TokenService";

export function AccountMethods(schema: mongoose.Schema) {
	schema.statics.findAccountByLogin = async function (login: string) {
		return this.findOne({ login });
	};
	schema.statics.findAccountByEmail = async function (email: string) {
		return this.findOne({ email });
	};
	schema.statics.findAccountByToken = async function (token: string) {
		const { login } = TokenService.decodeToken(token) as { login: string };
		return this.findOne({ login });
	};
	schema.statics.createAccount = async function (userData: IUser) {
		const { login, email, password } = userData;

		const passwordHash = await TokenService.hashingPassword(password);

		const user = new this({
			login,
			email,
			password: passwordHash,
		});

		return user.save();
	};
	schema.methods.generateToken = async function () {
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
