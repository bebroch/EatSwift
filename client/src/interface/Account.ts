import { Model as MondoModel, ObjectId } from "mongoose";
import { EnumRole } from "../Enums/Role";

namespace IAccount{
	
	export interface Information {
		login: string;
		role: EnumRole;
	}
	
	export interface Get {
		_id: ObjectId;
		login: string;
		email: string;
		verified: boolean;
		createdAt: Date;
		updatedAt: Date;
	}
	
	export interface Function extends Get {
		generateToken(): Promise<string>;
	}
	
	export interface Model extends MondoModel<Function> {
		findAccountByLogin(login: string): Promise<Function | null>;
		findAccountByEmail(email: string): Promise<Function | null>;
		createAccount(accountData: any): Promise<Function | null>;
		findAccountByToken(token: string): Promise<Function | null>;
	}

}


export default IAccount;
