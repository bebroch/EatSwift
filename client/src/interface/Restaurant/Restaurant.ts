import { Model } from "mongoose";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IMenu, IMenuDataForCreate, IMenuDataForDelete, IMenuDataForFind } from "./Menu";
import { IDish, IDishDataForCreate, IDishDataForDelete, IDishDataForFind } from "./Dish";

interface IRestaurant extends IAccount {
	name: string;
	description?: string;
	address?: string;
	contactInfo?: string;
	rating: number;
	password: string;
	menu: IMenu[];
}

interface IRestaurantFunctions extends IRestaurant, IAccountFunction {
	getMenus(): Promise<IMenu[]>;
	getMenu(menuData: IMenuDataForFind): Promise<IMenu>;
	createMenu(MenuData: IMenuDataForCreate): Promise<IMenu>;
	deleteMenu(MenuData: IMenuDataForDelete): Promise<void>;

	getDishes(): Promise<IDish[]>;
	getDish(dishData: IDishDataForFind): Promise<IDish>;
	createDish(dishData: IDishDataForCreate): Promise<IDish>;
	deleteDish(dishData: IDishDataForDelete): Promise<void>;
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
