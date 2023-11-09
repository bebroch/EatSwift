import { Model, ObjectId } from "mongoose";
import { IDish } from "../DIsh/DishModel";
import {
	MenuTypes.GetDataForAddToMenu,
	MenuTypes.GetDataForCreate,
	MenuTypes.GetDataForDelete,
	IMenuDataForFindMany,
	MenuTypes.GetDataForFindOne,
} from "./MenuTypes";

interface IMenu {
	_id: ObjectId;
	name: string;
	description: string;
	restaurant_id: ObjectId;
	dish: IDish[];
	createdAt: Date;
	updatedAt: Date;
}

interface IMenuModel extends Model<IMenu> {
	getMenus(menuData: IMenuDataForFindMany): Promise<IMenu[]>;
	getMenu(menuData: MenuTypes.GetDataForFindOne): Promise<IMenu | null>;

	createMenu(menuData: MenuTypes.GetDataForCreate): Promise<IMenu>;
	deleteMenu(menuData: MenuTypes.GetDataForDelete): Promise<void>;

	addDishToMenu(menuData: MenuTypes.GetDataForAddToMenu): Promise<IMenu>;
}

export { IMenu, IMenuModel };
