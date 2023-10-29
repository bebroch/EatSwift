import mongoose from "mongoose";
import { IUser, IUserModel } from "../interface/User";
import { decodeToken } from "../Services/Jwt";

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

UserSchema.statics.findUserByLogin = async function (login: string) {
	return this.findOne({ login });
};

UserSchema.statics.findUserByEmail = async function (email: string) {
	return this.findOne({ email });
};

UserSchema.statics.findUserWithToken = async function (token: string) {
	const userData = await decodeToken(token);
	return this.findOne(userData);
};

UserSchema.statics.createUser = async function (userData: any) {
	const user = new this(userData);
	return user.save();
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
