import { Model, ObjectId } from "mongoose";
import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindMany,
	IDishDataForFindOne,
} from "./DishTypes";

interface IDish {
	_id: ObjectId;
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
}

interface IDishModel extends Model<IDish> {
	getDishes(dishData: IDishDataForFindMany): Promise<IDish[]>;
	getDish(dishData: IDishDataForFindOne): Promise<IDish>;

	createDish(dishData: IDishDataForCreate): Promise<IDish>;
	deleteDish(dishData: IDishDataForDelete): Promise<void>;
}

export { IDish, IDishModel };
