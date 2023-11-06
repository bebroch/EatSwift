import { Request } from "express";
import {
	IDishDataForAddToCart,
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForDeleteFromCart,
	IDishDataForFindOne,
} from "../../../../interface/Restaurant/DIsh/DishTypes";

function getDishDataForCreate(req: Request & IDishDataForCreate) {
	const { name, description, ingredients, picture, price } = req.body;
	return { name, description, ingredients, picture, price };
}

function getDishDataForDelete(req: Request & IDishDataForDelete) {
	const { _id } = req.params;
	return { _id };
}

function getDishDataForFind(req: Request & IDishDataForFindOne) {
	const { _id } = req.body;
	return { _id };
}

function getDishDataForAddToCart(req: Request & IDishDataForAddToCart) {
	const { _id } = req.body;
	return { _id };
}

function getDishDataForDeleteFromCart(
	req: Request & IDishDataForDeleteFromCart
) {
	const { _id } = req.body;
	return { _id };
}

export {
	getDishDataForCreate,
	getDishDataForDelete,
	getDishDataForFind,
	getDishDataForAddToCart,
	getDishDataForDeleteFromCart,
};
