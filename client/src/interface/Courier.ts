import { Model, ObjectId } from "mongoose";
import { IOrder } from "./Order";
import { IAccount, IAccountFunction, IAccountModel } from "./Account";
import { ICourierRegisterData } from "./Auth/Register/RegisterData";
import OrderTypes from "../Types/OrderTypes";

interface ICourier extends IAccount {
	firstName: string;
	lastName: string;
	order_id: ObjectId;
	phoneNumber?: string;
	password: string;
}

interface ICourierFunctions extends ICourier, IAccountFunction {
	getActiveOrder(): Promise<IOrder>;
	takeOrder(orderData: OrderTypes.GetDataForMakeOrder): Promise<IOrder>;
	updateStatus(
		statusData: OrderTypes.GetDataForUpdateStatus
	): Promise<IOrder>;
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
