import { Model } from "mongoose";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import {
	IMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindOne,
} from "./Menu";
import {
	IDish,
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindOne,
} from "./Dish";

interface IRestaurant extends IAccount {
	name: string;
	description?: string;
	addresses?: string;
	contactInfo?: string;
	rating: number;
	password: string;
	menu: IMenu[];
}

interface IRestaurantFunctions extends IRestaurant, IAccountFunction {
	getRestaurantData(): Promise<IRestaurant>;

	getMenus(): Promise<IMenu[]>;
	getMenu(menuData: IMenuDataForFindOne): Promise<IMenu>;
	createMenu(MenuData: IMenuDataForCreate): Promise<IMenu>;
	deleteMenu(MenuData: IMenuDataForDelete): Promise<void>;

	getDishes(): Promise<IDish[]>;
	getDish(dishData: IDishDataForFindOne): Promise<IDish>;
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
