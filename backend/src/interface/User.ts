import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";
import { IOrder } from "./Order";

interface IUser extends Document {
	_id?: ObjectId;
	login: string;
	email?: string;
	address?: string;
	phoneNumber?: string;
	password: string;
	verified?: boolean;
	cart: ObjectId[];

	getCart(): Promise<ICart>;
	getOrders(): Promise<IOrder[]>;
	addToCart(item_id: ObjectId): Promise<void>;
	deleteItemFromCart(item_id: ObjectId): Promise<void>;
}

interface IUserModel extends Model<IUser> {
	findUserByLogin(login: string): Promise<IUser | null>;
	findUserByEmail(email: string): Promise<IUser | null>;
	createUser(userData: any): Promise<IUser | null>;
	findUserWithToken(token: string): Promise<IUser | null>;
}

export { IUser, IUserModel };
