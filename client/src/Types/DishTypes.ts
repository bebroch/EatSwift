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
		price: number;
		restaurant_id?: ObjectId;
	};

	export type GetDataForDelete = {
		_id: string | ObjectId;
		restaurant_id?: ObjectId;
	};

	export type GetDataForAddToCart = {
		dish_id: string | ObjectId;
		restaurant_id: string | ObjectId;
	};

	export type GetDataForDeleteFromCart = {
		dish_id: string | ObjectId;
		restaurant_id: string | ObjectId;
	};

	export type outputDataDetails = {
		_id: ObjectId;
		name: string;
		description: string;
		ingredients: string[];
		price: number;
	};
}

export { DishTypes };
