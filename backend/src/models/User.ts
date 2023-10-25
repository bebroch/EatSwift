import mongoose, { Document, Model } from "mongoose";
import IUser from "../interface/User";

const UserSchema = new mongoose.Schema({
	login: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	address: { type: String, required: false },
	phoneNumber: { type: String, required: false },
	password: { type: String, required: true },
	verified: { type: Boolean, required: false },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
