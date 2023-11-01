import { Model, ObjectId } from "mongoose";
import { IOrder } from "../User/Order";
import { IAccount, IAccountFunction, IAccountModel } from "../Account/Account";
import { ICourierRegisterData } from "../RegisterInterface/RegisterData";

interface ICourier extends IAccount {
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	password: string;
}

interface ICourierFunctions extends ICourier, IAccountFunction {
	getOrder(): Promise<IOrder>;
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
