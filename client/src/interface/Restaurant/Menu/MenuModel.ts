import { Model, ObjectId } from "mongoose";
import { IDish } from "../DIsh/DishModel";
import {
	IMenuDataForAddToMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindMany,
	IMenuDataForFindOne,
} from "./MenuTypes";

interface IMenu {
	_id: ObjectId;
	name: string;
	description: string;
	restaurant_id: ObjectId;
	dish: IDish[];
	createdAt: Date;
	updateAt: Date;
}

interface IMenuModel extends Model<IMenu> {
	getMenus(menuData: IMenuDataForFindMany): Promise<IMenu[]>;
	getMenu(menuData: IMenuDataForFindOne): Promise<IMenu | null>;

	createMenu(menuData: IMenuDataForCreate): Promise<IMenu>;
	deleteMenu(menuData: IMenuDataForDelete): Promise<void>;

	addDishToMenu(menuData: IMenuDataForAddToMenu): Promise<IMenu>;
}

export { IMenu, IMenuModel };
