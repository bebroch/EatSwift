import { Model } from "mongoose";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IRestaurantRegisterData } from "../RegisterInterface/RegisterData";
import { IDish } from "./DIsh/DishModel";
import { IMenu } from "./Menu/MenuModel";
import { DishTypes } from "../../Types/DishTypes";
import { MenuTypes } from "../../Types/MenuTypes";
import { RestaurantTypes } from "../../Types/RestaurantTypes";
import OrderTypes from "../../Types/OrderTypes";
import { IOrder } from "../User/Order";

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
	deleteDishFromMenu(data: MenuTypes.GetDataForDeleteDishFromMenu): Promise<void>;

	getHistoryOfOrders(): Promise<IOrder[]>;
	getActiveOrders(): Promise<IOrder[]>;
	updateOrder(data: OrderTypes.GetDataForUpdate): Promise<IOrder>;
	cancelOrder(data: OrderTypes.GetDataForCancel): Promise<void>;

	updateInfo(
		updateData: RestaurantTypes.GetUpdateData
	): Promise<IRestaurantFunctions>;
	deleteAccount(): Promise<void>;
}

interface IRestaurantModel extends Model<IRestaurantFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<IRestaurantFunctions | null>;
	findAccountByEmail(email: string): Promise<IRestaurantFunctions | null>;
	createAccount(
		accountData: IRestaurantRegisterData
	): Promise<IRestaurantFunctions | null>;
	findAccountByToken(token: string): Promise<IRestaurantFunctions | null>;
	getRestaurants(): Promise<IRestaurantFunctions[]>;
}

export { IRestaurant, IRestaurantFunctions, IRestaurantModel };
