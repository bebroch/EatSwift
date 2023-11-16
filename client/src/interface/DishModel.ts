import { Model, ObjectId } from "mongoose";
import { DishTypes } from "../Types/DishTypes";

interface IDish {
	_id: ObjectId;
	name: string;
	description: string;
	ingredients: string[];
	price: number;
}

interface IDishModel extends Model<IDish> {
	getDishes(dishData: DishTypes.GetDataForFindMany): Promise<IDish[]>;
	getDish(dishData: DishTypes.GetDataForFindOne): Promise<IDish>;

	createDish(dishData: DishTypes.GetDataForCreate): Promise<IDish>;
	deleteDish(dishData: DishTypes.GetDataForDelete): Promise<void>;
}

export { IDish, IDishModel };
