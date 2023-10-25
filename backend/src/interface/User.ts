import { Model, ObjectId } from "mongoose";

interface IUser extends Document {
	_id: ObjectId;
	login: string;
	email: string;
	address: string;
	phoneNumber: string;
	password: string;
	verified: boolean;
}

interface IUserModel extends Model<IUser> {
	findUserByLogin: (login: string) => Promise<IUser | null>;
	findUserByEmail: (email: string) => Promise<IUser | null>;
	createUser(
		login: string,
		email: string,
		password: string
	): Promise<IUser | null>;
}

export { IUser, IUserModel };
