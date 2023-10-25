import mongoose from "mongoose";
import { IUser, IUserModel } from "../interface/User";

const UserSchema = new mongoose.Schema(
	{
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false },
	},
	{ timestamps: true }
);

UserSchema.statics.findUserByLogin = function (login: string) {
	return this.findOne({ login });
};

UserSchema.statics.findUserByEmail = function (email: string) {
	return this.findOne({ email });
};

UserSchema.statics.createUser = function (
	login: string,
	email: string,
	password: string
) {
	const user = new this({
		login,
		email,
		password,
	});
	return user.save();
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
