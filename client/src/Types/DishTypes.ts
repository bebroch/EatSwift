import { ObjectId } from "mongoose";

namespace DishTypes {
	export type GetDataForFindMany = {
		restaurant_id?: ObjectId;
	};

	export type GetDataForFindOne = {
		_id: string | ObjectId;
		restaurant_id?: ObjectId;
	};

	export type GetDataForCreate = {
		name: string;
		description: string;
		ingredients: string[];
		picture: string;
		price: number;
		restaurant_id?: ObjectId;
	};

	export type GetDataForDelete = {
		_id: string | ObjectId;
		restaurant_id?: ObjectId;
	};

	export type GetDataForAddToCart = {
		_id: string | ObjectId;
	};

	export type GetDataForDeleteFromCart = {
		_id: string | ObjectId;
	};
}

export { DishTypes };
