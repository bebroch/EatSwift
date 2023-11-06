import mongoose from "mongoose";
import { IUser, IUserModel } from "../../interface/User/User";
import { UserMethods } from "./UserMethods";

const UserSchema = new mongoose.Schema(
	{
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		password: { type: String, required: true },
		verified: { type: Boolean, required: false, default: false },
		cart: [
			{
				dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{ timestamps: true }
);

UserMethods(UserSchema);

export default UserSchema;
