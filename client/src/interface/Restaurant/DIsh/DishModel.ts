import { Model, ObjectId } from "mongoose";
import {
	DishTypes.GetDataForCreate,
	DishTypes.GetDataForDelete,
	IDishDataForFindMany,
	DishTypes.GetDataForFindOne,
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
	getDish(dishData: DishTypes.GetDataForFindOne): Promise<IDish>;

	createDish(dishData: DishTypes.GetDataForCreate): Promise<IDish>;
	deleteDish(dishData: DishTypes.GetDataForDelete): Promise<void>;
}

export { IDish, IDishModel };
