import { Model, ObjectId } from "mongoose";
import { IOrder } from "./Order";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IUserRegisterData } from "../RegisterInterface/RegisterData";
import { IDish } from "../Restaurant/DIsh/DishModel";

interface ICartItem {
	_id: ObjectId;
	dish: IDish;
	quantity: number;
}

interface IUser extends IAccount {
	address?: string;
	phoneNumber?: string;
	password: string;
	cart: ICartItem[];
}

interface IUserFunctions extends IUser, IAccountFunction {
	getCart(): Promise<ICartItem[]>;
	getOrders(): Promise<IOrder[]>;
	addToCart(itemData: any): Promise<void>;
	deleteItemFromCart(itemData: any): Promise<void>;
	getUserDataWithCart(): Promise<IUserFunctions>;
}

interface IUserModel extends Model<IUserFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<IUser | null>;
	findAccountByEmail(email: string): Promise<IUser | null>;
	createAccount(
		accountData: IUserRegisterData
	): Promise<IUserFunctions | null>;
	findAccountByToken(token: string): Promise<IUserFunctions | null>;
}

export { ICartItem, IUser, IUserFunctions, IUserModel };
