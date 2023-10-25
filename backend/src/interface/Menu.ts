import { ObjectId } from "mongoose";

interface IMenu extends Document {
	_id: ObjectId;
	restaurant_id: ObjectId;
	name: string;
	description: string;
	mealPeriod: string;
}

export default IMenu;