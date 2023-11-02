import { Model, ObjectId } from "mongoose";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";

interface IRestaurant extends IAccount {
	name: string;
	description?: string;
	address?: string;
	contactInfo?: string;
	rating: number;
	password: string;
}

interface IRestaurantFunctions extends IRestaurant, IAccountFunction {}

interface IRestaurantModel extends Model<IRestaurantFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<IRestaurantFunctions | null>;
	findAccountByEmail(email: string): Promise<IRestaurantFunctions | null>;
	createAccount(
		accountData: IRestaurantRegisterData
	): Promise<IRestaurantFunctions | null>;
	findAccountByToken(token: string): Promise<IRestaurantFunctions | null>;
}

export { IRestaurant, IRestaurantModel };
