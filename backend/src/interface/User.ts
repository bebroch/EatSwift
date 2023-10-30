import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";

interface IUser extends Document {
	_id?: ObjectId;
	login: string;
	email?: string;
	address?: string;
	phoneNumber?: string;
	password: string;
	verified?: boolean;

	getCart(): Promise<ICart>;
}

interface IUserModel extends Model<IUser> {
	findUserByLogin(login: string): Promise<IUser | null>;
	findUserByEmail(email: string): Promise<IUser | null>;
	createUser(userData: any): Promise<IUser | null>;
	findUserWithToken(token: string): Promise<IUser | null>;
}

export { IUser, IUserModel };
