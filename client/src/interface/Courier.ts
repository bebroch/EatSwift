import { Model, ObjectId } from "mongoose";
import { IOrder } from "./Order";

interface ICourier {
	_id: ObjectId;
	firstName: string;
	lastName: string;
	login: string;
	email: string;
	phoneNumber?: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

interface ICourierFunctions extends ICourier {
	getOrder(): Promise<IOrder>;
}

interface ICourierModel extends Model<ICourierFunctions> {
	findCourierByLogin(login: string): Promise<ICourier | null>;
	findCourierByEmail(email: string): Promise<ICourier | null>;
	createCourier(courierData: any): Promise<ICourier | null>;
	findCourierWithToken(token: string): Promise<ICourier | null>;
}

export { ICourier, ICourierFunctions, ICourierModel };
