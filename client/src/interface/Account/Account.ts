import { Model, ObjectId } from "mongoose";

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

export { IAccount, IAccountFunction, IAccountModel };
