import { ObjectId } from "mongoose";

interface IUser extends Document {
	_id: ObjectId;
	login: string;
	email: string;
	address: string;
	phoneNumber: string;
	password: string;
	verified: boolean;
}

export default IUser;
