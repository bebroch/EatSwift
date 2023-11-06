import { Model } from "mongoose";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IDish } from "./DIsh/DishModel";
import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindOne,
} from "./DIsh/DishTypes";
import { IMenu } from "./Menu/MenuModel";
import {
	IMenuDataForAddToMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindOne,
} from "./Menu/MenuTypes";

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

	addDishToMenu(data: IMenuDataForAddToMenu): Promise<IMenu>;
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
