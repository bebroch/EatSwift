import { Model, ObjectId } from "mongoose";
import { IDishItem } from "./Dish";

interface IMenuItem {
	menu_id: ObjectId;
	dish: IDishItem[];
}

interface IMenu {
	_id?: ObjectId;
	restaurant_id: ObjectId;
	name: string;
	description: string;
}

interface IMenuModel extends Model<IMenu> {
	createMenu(menuData: IMenu): Promise<IMenu>;
}

export { IMenuItem, IMenu, IMenuModel };
