import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";
import { IOrder } from "./Order";

interface IUser {
	_id: ObjectId;
	login: string;
	email: string;
	address?: string;
	phoneNumber?: string;
	password: string;
	verified: boolean;
	cart: ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

interface IUserFunctions extends IUser {
	getCart(): Promise<ICart>;
	getOrders(): Promise<IOrder[]>;
	addToCart(item_id: ObjectId): Promise<void>;
	deleteItemFromCart(item_id: ObjectId): Promise<void>;
}

interface IUserModel extends Model<IUserFunctions> {
	findUserByLogin(login: string): Promise<IUser | null>;
	findUserByEmail(email: string): Promise<IUser | null>;
	createUser(userData: any): Promise<IUser | null>;
	findUserWithToken(token: string): Promise<IUser | null>;
}

export { IUser, IUserFunctions, IUserModel };
