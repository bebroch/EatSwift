import { Model, ObjectId } from "mongoose";
import { ICart } from "./Cart";
import { IOrder } from "./Order";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IUserRegisterData } from "../RegisterInterface/RegisterData";

interface IUser extends IAccount {
	address?: string;
	phoneNumber?: string;
	password: string;
	cart: ObjectId[];
}

interface IUserFunctions extends IUser, IAccountFunction {
	getCart(): Promise<ICart>;
	getOrders(): Promise<IOrder[]>;
	addToCart(item_id: ObjectId): Promise<void>;
	deleteItemFromCart(item_id: ObjectId): Promise<void>;
}

interface IUserModel extends Model<IUserFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<IUser | null>;
	findAccountByEmail(email: string): Promise<IUser | null>;
	createAccount(
		accountData: IUserRegisterData
	): Promise<IUserFunctions | null>;
	findAccountWithToken(token: string): Promise<IUser | null>;
}

export { IUser, IUserFunctions, IUserModel };
