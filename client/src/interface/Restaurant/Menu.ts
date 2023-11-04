import { Model, ObjectId } from "mongoose";
import { IDish, IDishItem } from "./Dish";

interface IMenuItem {
	menu_id: ObjectId;
	dish: IDishItem[];
}

interface IMenuData {
	id?: string;
	name?: string;
	description?: string;
}

interface IMenu {
	_id: ObjectId;
	name: string;
	description: string;
	dish: IDish[];
}

interface IMenuModel extends Model<IMenu> {
	createMenu(menuData: IMenuData): Promise<IMenu>;
}

export { IMenuItem, IMenuData, IMenu, IMenuModel };
