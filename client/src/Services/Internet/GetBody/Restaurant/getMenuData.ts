import { Request } from "express";
import { IMenu, IMenuData } from "../../../../interface/Restaurant/Menu";

async function getMenuData(req: Request): Promise<IMenuData> {
	const { id, name, description } = req.body;
	return { id, name, description };
}

export default getMenuData;
