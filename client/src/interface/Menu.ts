import { Model, ObjectId } from "mongoose";

interface IMenu {
	_id?: ObjectId;
	restaurant_id: ObjectId;
	name: string;
	description: string;
}

interface IMenuModel extends Model<IMenu> {
	createMenu(menuData: IMenu): Promise<IMenu>;
}

export { IMenu, IMenuModel };