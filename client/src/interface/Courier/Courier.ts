import { Model, ObjectId } from "mongoose";
import { IOrder } from "../User/Order";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { ICourierRegisterData } from "../RegisterInterface/RegisterData";
import OrderTypes from "../../Types/OrderTypes";
import { CourierTypes } from "../../Types/CourierTypes";

interface ICourier extends IAccount {
	firstName: string;
	lastName: string;
	order_id: ObjectId;
	phoneNumber?: string;
	password: string;
	rating: number;
}

interface ICourierFunctions extends ICourier, IAccountFunction {
	getActiveOrder(): Promise<IOrder>;
	takeOrder(orderData: OrderTypes.GetDataForMakeOrder): Promise<IOrder>;
	updateStatus(
		statusData: OrderTypes.GetDataForUpdateStatus
	): Promise<IOrder>;

	getHistoryOfOrders(): Promise<IOrder[]>;
	getOrderFromHistory(
		data: CourierTypes.GetOrderFromHistory
	): Promise<IOrder>;

	getData(): Promise<ICourierFunctions>;
}

interface ICourierModel extends Model<ICourierFunctions, IAccountModel> {
	findAccountByLogin(login: string): Promise<ICourierFunctions | null>;
	findAccountByEmail(email: string): Promise<ICourierFunctions | null>;
	createAccount(
		accountData: ICourierRegisterData
	): Promise<ICourierFunctions | null>;
	findAccountByToken(token: string): Promise<ICourierFunctions | null>;
}

export { ICourier, ICourierFunctions, ICourierModel };
