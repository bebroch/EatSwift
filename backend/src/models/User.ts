import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
	login: string;
	email: string;
	address: string;
	phoneNumber: string;
	password: string;
	verified: boolean;
}

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
