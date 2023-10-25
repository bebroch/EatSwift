import { ObjectId } from "mongoose";

interface IRestaurant extends Document {
	_id: ObjectId;
	name: string;
	email: string;
	description: string;
	address: string;
	contactInfo: string;
	rating: string;
	password: string;
	verified: boolean;
}

export default IRestaurant;
