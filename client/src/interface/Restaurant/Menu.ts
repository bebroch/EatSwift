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

interface IMenuDataForFindMany {
	restaurant_id?: ObjectId;
}

interface IMenuDataForFindOne {
	_id: string | ObjectId;
	restaurant_id?: ObjectId;
}

interface IMenu {
	_id: ObjectId;
	name: string;
	description: string;
	dish: IDish[];
	createdAt: Date;
	updateAt: Date;
}

interface IMenuModel extends Model<IMenu> {
	getMenus(menuData: IMenuDataForFindMany): Promise<IMenu[]>;
	getMenu(menuData: IMenuDataForFindOne): Promise<IMenu | null>;

	createMenu(menuData: IMenuDataForCreate): Promise<IMenu>;
	deleteMenu(menuData: IMenuDataForDelete): Promise<void>;
}

export {
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindMany,
	IMenuDataForFindOne,
	IMenu,
	IMenuModel,
};
