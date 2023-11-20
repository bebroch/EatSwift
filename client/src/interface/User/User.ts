import { Model, ObjectId } from "mongoose";
import { IOrder } from "./Order";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { IUserRegisterData } from "../RegisterInterface/RegisterData";
import { ICart, ICartItem } from "./Cart";
import { UserTypes } from "../../Types/UserTypes";
import OrderTypes from "../../Types/OrderTypes";
import RatingTypes from "../../Types/RatingTypes";

interface IUser extends IAccount {
	address?: string;
	phoneNumber?: string;
	password: string;
}

interface IUserFunctions extends IUser, IAccountFunction {
	getCart(): Promise<ICart[]>;
	getOrders(): Promise<IOrder[]>;
	addToCart(itemData: any): Promise<void>;
	deleteItemFromCart(itemData: UserTypes.GetDataForDelete): Promise<void>;
	getUserDataWithCart(): Promise<UserTypes.outputDataForDetails>;
	makeOrder(
		dataForMakeOrder: UserTypes.GetDataForMakeOrder
	): Promise<OrderTypes.outputDataForDetails>;
	getCartByRestaurant(data: UserTypes.GetDataForMakeOrder): Promise<ICart>;

	getHistoryOfOrders(): Promise<IOrder[]>;
	getActiveOrders(): Promise<IOrder[]>;
	cancelOrder(data: OrderTypes.GetDataForCancel): Promise<void>;

	getRatingRestaurant(
		ratingData: RatingTypes.GetRestaurantForCreateRating
	): Promise<void>;
	getRatingCourier(
		ratingData: RatingTypes.GetCourierForCreateRating
	): Promise<void>;
	giveRatingRestaurant(
		ratingData: RatingTypes.GetRestaurantForCreateRating
	): Promise<void>;
	giveRatingCourier(
		ratingData: RatingTypes.GetCourierForCreateRating
	): Promise<void>;
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
