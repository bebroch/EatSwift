import { Model, ObjectId } from "mongoose";
import { IDish } from "./Dish";

interface IMenuDataForCreate {
	restaurant_id?: string;
	name: string;
	description: string;
}

interface IMenuDataForDelete {
	_id: string | ObjectId;
	restaurant_id?: ObjectId;
}

interface IMenuDataForFind {
	_id: string | ObjectId;
}

interface IMenu {
	_id: ObjectId;
	name: string;
	description: string;
	restaurant_id: ObjectId;
	dish: IDish[];
	createdAt: Date;
}

interface IMenuModel extends Model<IMenu> {
	createMenu(menuData: IMenuDataForCreate): Promise<IMenu>;
	deleteMenu(menuData: IMenuDataForDelete): Promise<void>;
}

export {
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFind,
	IMenu,
	IMenuModel,
};
