import { Request } from "express";
import {
	IMenuDataForAddToMenu,
	IMenuDataForCreate,
	IMenuDataForDelete,
} from "../../../../interface/Restaurant/Menu/MenuTypes";

function getMenuDataForCreate(req: Request): IMenuDataForCreate {
	const { name, description } = req.body;
	return { name, description };
}

function getMenuDataForDelete(req: Request): IMenuDataForDelete {
	const { _id } = req.body;
	return { _id };
}

function getMenuDataForAddDishToMenu(req: Request): IMenuDataForAddToMenu {
	const { dish_id } = req.body;
	const { menu_id } = req.params;
	return { dish_id, menu_id };
}

export {
	getMenuDataForCreate,
	getMenuDataForDelete,
	getMenuDataForAddDishToMenu,
};
