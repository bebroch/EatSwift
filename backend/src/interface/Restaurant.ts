import { Model, ObjectId } from "mongoose";

interface IRestaurant {
	_id?: ObjectId;
	name: string;
	email: string;
	description: string;
	address: string;
	contactInfo: string;
	rating: number;
	password: string;
	verified: boolean;
}

interface IRestaurantModel extends Model<IRestaurant> {
	createRestaurant(restaurantData: IRestaurant): Promise<IRestaurant>;
}

export { IRestaurant, IRestaurantModel };
