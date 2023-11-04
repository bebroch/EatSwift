import { Model } from "mongoose";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IMenu, IMenuData, IMenuItem } from "./Menu";

interface IRestaurant extends IAccount {
	name: string;
	description?: string;
	address?: string;
	contactInfo?: string;
	rating: number;
	password: string;
	menu: IMenuItem[];
}

interface IRestaurantFunctions extends IRestaurant, IAccountFunction {
	createMenu(MenuData: IMenuData): Promise<IMenu>;
}

interface IRestaurantModel extends Model<IRestaurantFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<IRestaurantFunctions | null>;
	findAccountByEmail(email: string): Promise<IRestaurantFunctions | null>;
	createAccount(
		accountData: IRestaurantRegisterData
	): Promise<IRestaurantFunctions | null>;
	findAccountByToken(token: string): Promise<IRestaurantFunctions | null>;
}

export { IRestaurant, IRestaurantFunctions, IRestaurantModel };
