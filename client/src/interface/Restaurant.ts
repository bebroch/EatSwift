import { Model } from "mongoose";
import { IAccount, IAccountFunction, IAccountModel } from "./Account";
import { IRestaurantRegisterData } from "./Auth/Register/RegisterData";
import { IDish } from "./DishModel";
import { IMenu } from "./MenuModel";
import { DishTypes } from "../Types/DishTypes";
import { MenuTypes } from "../Types/MenuTypes";
import { RestaurantTypes } from "../Types/RestaurantTypes";
import OrderTypes from "../Types/OrderTypes";
import { IOrder } from "./Order";

interface IRestaurant extends IAccount {
	name: string;
	description?: string;
	addresses?: string;
	contactInfo?: string;
	rating: number;
	password: string;
}

interface IRestaurantFunctions extends IRestaurant, IAccountFunction {
	getRestaurantData(): Promise<RestaurantTypes.GetDataDetails>;

	getMenus(): Promise<IMenu[]>;
	getMenu(menuData: MenuTypes.GetDataForFindOne): Promise<IMenu>;
	createMenu(MenuData: MenuTypes.GetDataForCreate): Promise<IMenu>;
	deleteMenu(MenuData: MenuTypes.GetDataForDelete): Promise<void>;

	getDishes(): Promise<IDish[]>;
	getDish(dishData: DishTypes.GetDataForFindOne): Promise<IDish>;
	createDish(dishData: DishTypes.GetDataForCreate): Promise<IDish>;
	deleteDish(dishData: DishTypes.GetDataForDelete): Promise<void>;

	addDishToMenu(data: MenuTypes.GetDataForAddToMenu): Promise<IMenu>;

	getHistoryOfOrders(): Promise<IOrder[]>;
	getActiveOrders(): Promise<IOrder[]>;
	updateOrder(data: OrderTypes.GetDataForUpdate): Promise<IOrder>;
	cancelOrder(data: OrderTypes.GetDataForCancel): Promise<void>;
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
