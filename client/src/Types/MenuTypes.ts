import { ObjectId } from "mongoose";

namespace MenuTypes {
	export type GetDataForFindMany = {
		restaurant_id?: ObjectId;
	};

	export type GetDataForFindOne = {
		_id: string | ObjectId;
		restaurant_id?: ObjectId;
	};

	export type GetDataForCreate = {
		restaurant_id?: string;
		name: string;
		description: string;
	};

	export type GetDataForDelete = {
		_id: string | ObjectId;
		restaurant_id?: ObjectId;
	};

	export type GetDataForAddToMenu = {
		restaurant_id?: ObjectId;
		dish_id: string | ObjectId;
		menu_id: string | ObjectId;
	};

	export type GetDataForDeleteDishFromMenu = {
		restaurant_id?: ObjectId;
		dish_id: string | ObjectId;
		menu_id: string | ObjectId;
	};
}

export { MenuTypes };
