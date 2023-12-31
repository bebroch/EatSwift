import { Model, ObjectId } from "mongoose";
import { ICourier, ICourierFunctions } from "../../interface/Courier/Courier";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import { IUser, IUserFunctions } from "../../interface/User/User";
import { EnumRole } from "./Role";

type TAccount = IUserFunctions | IRestaurantFunctions | ICourierFunctions;

interface IAccountInformation {
	login: string;
	role: EnumRole;
}

interface IAccount {
	_id: ObjectId;
	login: string;
	email: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface IAccountFunction extends IAccount {
	generateToken(): Promise<string>;
}

interface IAccountModel extends Model<IAccountFunction> {
	findAccountByLogin(login: string): Promise<IAccountFunction | null>;
	findAccountByEmail(email: string): Promise<IAccountFunction | null>;
	createAccount(accountData: any): Promise<IAccountFunction | null>;
	findAccountByToken(token: string): Promise<IAccountFunction | null>;
}

export {
	IAccountInformation,
	IAccount,
	TAccount,
	IAccountFunction,
	IAccountModel,
};
