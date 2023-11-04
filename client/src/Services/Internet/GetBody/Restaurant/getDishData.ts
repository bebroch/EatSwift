import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindOne,
} from "../../../../interface/Restaurant/Dish";
import { Request } from "express";

async function getDishDataForCreate(req: Request & IDishDataForCreate) {
	const { name, description, ingredients, picture, price } = req.body;
	return { name, description, ingredients, picture, price };
}

async function getDishDataForDelete(req: Request & IDishDataForDelete) {
	const { _id } = req.body;
	return { _id };
}

async function getDishDataForFind(req: Request & IDishDataForFindOne) {
	const { _id } = req.body;
	return { _id };
}

export { getDishDataForCreate, getDishDataForDelete, getDishDataForFind };
