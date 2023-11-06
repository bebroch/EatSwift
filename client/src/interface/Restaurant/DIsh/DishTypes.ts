import { ObjectId } from "mongoose";

interface IDishDataForCreate {
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
	restaurant_id?: ObjectId;
}

interface IDishDataForDelete {
	_id: string | ObjectId;
	restaurant_id?: ObjectId;
}

interface IDishDataForFindOne {
	_id: string | ObjectId;
	restaurant_id?: ObjectId;
}

interface IDishDataForFindMany {
	restaurant_id?: ObjectId;
}

interface IDishDataForAddToCart {
	_id: string | ObjectId;
}

interface IDishDataForDeleteFromCart {
	_id: string | ObjectId;
}

export {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindMany,
	IDishDataForFindOne,
	IDishDataForAddToCart,
	IDishDataForDeleteFromCart,
};
