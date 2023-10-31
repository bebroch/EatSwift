import { Model, ObjectId } from "mongoose";

interface IRestaurant {
	_id?: ObjectId;
	name: string;
	email: string;
	description?: string;
	address?: string;
	contactInfo?: string;
	rating: number;
	password: string;
	verified: boolean;
}

interface IRestaurantModel extends Model<IRestaurant> {
	createRestaurant(restaurantData: IRestaurant): Promise<IRestaurant>;
	findRestaurantByLogin(login: string): Promise<IRestaurant | null>;
	findRestaurantByEmail(email: string): Promise<IRestaurant | null>;
}

export { IRestaurant, IRestaurantModel };
