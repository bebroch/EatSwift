import { ObjectId } from "mongoose";

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

interface IMenuDataForAddToMenu {
	dish_id: string | ObjectId;
	menu_id: string | ObjectId;
}

export {
	IMenuDataForCreate,
	IMenuDataForDelete,
	IMenuDataForFindMany,
	IMenuDataForFindOne,
	IMenuDataForAddToMenu,
};
