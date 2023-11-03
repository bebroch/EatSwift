import { Model, ObjectId } from "mongoose";

interface IDishItem {
	dish: ObjectId;
}

interface IDish {
	_id?: ObjectId;
	restaurant_id: ObjectId;
	menu_id?: ObjectId;
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
}

interface IDishModel extends Model<IDish> {
	createDish(dishData: IDish): Promise<IDish>;
}

export { IDishItem, IDish, IDishModel };
