import { Model, ObjectId } from "mongoose";

interface IDishDataForCreate {
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
	restaurant_id?: ObjectId;
}

interface IDishDataForDelete {
	_id: string | ObjectId;
	restaurant_id?: ObjectId;
}

interface IDish {
	_id: ObjectId;
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
}

interface IDishModel extends Model<IDish> {
	createDish(dishData: IDishDataForCreate): Promise<IDish>;
	deleteDish(dishData: IDishDataForDelete): Promise<void>;
}

export { IDishDataForCreate, IDishDataForDelete, IDish, IDishModel };
