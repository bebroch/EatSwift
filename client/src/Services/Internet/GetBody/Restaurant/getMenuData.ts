import { Request } from "express";
import {
	IMenuDataForCreate,
	IMenuDataForDelete,
} from "../../../../interface/Restaurant/Menu";

async function getMenuDataForCreate(req: Request): Promise<IMenuDataForCreate> {
	const { name, description } = req.body;
	return { name, description };
}

async function getMenuDataForDelete(req: Request): Promise<IMenuDataForDelete> {
	const { _id } = req.body;
	return { _id };
}

export { getMenuDataForCreate, getMenuDataForDelete };
